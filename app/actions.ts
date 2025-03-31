'use server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, orderSchema, productSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";
import { redis } from "./lib/redis";
import { Cart } from "./lib/interfaces";
import { revalidatePath } from "next/cache";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";
import ShippingConfirmationEmail from "@/emails/shippingConfirmationEmail";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

function generateOrderNumber() {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const date = new Date().getTime().toString().slice(-4); // ex: "5394"
  return `GDL-${random}${date}`;
}


export async function createProduct(
  previousState: unknown,
  formData: FormData
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (
    !user ||
    (user.email !== "yannisboulaid1@gmail.com" &&
      user.email !== "domecq.raphael@gmail.com")
  ) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      parfum: submission.value.parfum,
      poids: submission.value.poids,
      composition: submission.value.composition,
      tempscombustion: submission.value.tempscombustion,
      contenance: submission.value.contenance,
      price: submission.value.price,
      images: flattenUrls,
      stock: submission.value.stock,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured,
    },
  });

  redirect("/dashboard/products");
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function editProduct(previousState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (
    !user ||
    (user.email !== "yannisboulaid1@gmail.com" &&
      user.email !== "domecq.raphael@gmail.com")
  ) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const productId = formData.get("productId") as string;
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      parfum: submission.value.parfum,
      poids: submission.value.poids,
      composition: submission.value.composition,
      tempscombustion: submission.value.tempscombustion,
      contenance: submission.value.contenance,
      category: submission.value.category,
      price: submission.value.price,
      stock: submission.value.stock,
      isFeatured: submission.value.isFeatured === true ? true : false,
      status: submission.value.status,
      images: flattenUrls,
    },
  });

  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (
    !user ||
    (user.email !== "yannisboulaid1@gmail.com" &&
      user.email !== "domecq.raphael@gmail.com")
  ) {
    return redirect("/");
  }

  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  });

  redirect("/dashboard/products");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function editOrder(previousState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Auth check
  if (
    !user ||
    (user.email !== "yannisboulaid1@gmail.com" &&
      user.email !== "domecq.raphael@gmail.com")
  ) {
    return redirect("/");
  }

  // Validate input
  const submission = parseWithZod(formData, {
    schema: orderSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const orderId = formData.get("orderId") as string;
  const newStatus = submission.value.statuscomm;

  // Get previous status
  const previous = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      statuscomm: true,
      User: { select: { email: true } },
      shippingName: true,
      orderNumber: true,
    },
  });

  // Update order status
  await prisma.order.update({
    where: { id: orderId },
    data: {
      statuscomm: newStatus,
    },
  });

  // Save to status history
  await prisma.orderStatusHistory.create({
    data: {
      orderId,
      status: newStatus,
    },
  });

  // Send email if the new status is "communiquetransporteur"
  if (
    previous &&
    previous.statuscomm !== "communiquetransporteur" &&
    newStatus === "communiquetransporteur" &&
    previous.User?.email
  ) {
    await resend.emails.send({
      from: `Gandle <${process.env.RESEND_FROM_EMAIL}>`,
      to: previous.User.email,
      subject: "Votre commande est en route !",
      react: ShippingConfirmationEmail({
        name: previous.shippingName,
        orderNumber: previous.orderNumber,
      }),
    });
  }

  redirect("/dashboard/orders");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createBanner(previousState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (
    !user ||
    (user.email !== "yannisboulaid1@gmail.com" &&
      user.email !== "domecq.raphael@gmail.com")
  ) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  });

  redirect("/dashboard/banner");
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (
    !user ||
    (user.email !== "yannisboulaid1@gmail.com" &&
      user.email !== "domecq.raphael@gmail.com")
  ) {
    return redirect("/");
  }

  await prisma.banner.delete({
    where: {
      id: formData.get("bannerId") as string,
    },
  });

  redirect("/dashboard/banner");
}

export async function addItem(productId: string, formData: FormData) {
  const quantity = Number(formData.get("quantity") || 1);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      poids: true,
    },
    where: {
      id: productId,
    },
  });

  if (!selectedProduct) {
    throw new Error("No product with this id");
  }

  const myCart = cart ?? {
    userId: user.id,
    items: [],
  };

  const existingItem = myCart.items.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    myCart.items.push({
      id: selectedProduct.id,
      poids: selectedProduct.poids,
      imageString: selectedProduct.images[0],
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity,
    });
  }

  await redis.set(`cart-${user.id}`, myCart);

  revalidatePath("/", "layout");
}

export async function deleteItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const productId = formData.get("productId");
  // eslint-disable-next-line prefer-const
  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`cart-${user.id}`, updateCart);
  }

  revalidatePath("/bag");
}

export async function checkOut() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }
  // eslint-disable-next-line prefer-const
  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  let totalPrice = 0;
  
  const orderNumber = generateOrderNumber();


  cart?.items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  let totalWeight = 0;

  cart?.items.forEach((item) => {
    totalWeight += item.poids * item.quantity;
  });

  if (cart && cart.items) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: "eur",
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            images: [item.imageString],
          },
        },
        quantity: item.quantity,
      }));

    const orderInfo: { name: string; quantity: number }[] = cart.items.map(
      (item) => ({
        name: item.name,
        quantity: item.quantity,
      })
    );

    let shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] =
      [];

    if (totalPrice > 80) {
      shippingOptions = [
        {
          shipping_rate: "shr_1QXo9zDxDzTpTbnPWI4RsKJj",
        },
      ];
    } else if (totalWeight > 0 && totalWeight <= 250) {
      shippingOptions = [
        {
          shipping_rate: "shr_1QXmvdDxDzTpTbnPY4BghtL7",
        },
        {
          shipping_rate: "shr_1QXoAdDxDzTpTbnPmtXoOWft",
        },
      ];
    } else if (totalWeight > 250 && totalWeight <= 500) {
      shippingOptions = [
        {
          shipping_rate: "shr_1QXo8YDxDzTpTbnPyyosAb4D",
        },
        {
          shipping_rate: "shr_1QXoAdDxDzTpTbnPmtXoOWft",
        },
      ];
    } else if (totalWeight > 500 && totalWeight <= 1000) {
      shippingOptions = [
        {
          shipping_rate: "shr_1QXo9ADxDzTpTbnPOS7MyPT4",
        },
        {
          shipping_rate: "shr_1QXoAdDxDzTpTbnPmtXoOWft",
        },
      ];
    } else if (totalWeight > 1000 && totalWeight <= 2000) {
      shippingOptions = [
        {
          shipping_rate: "shr_1QXo9aDxDzTpTbnPtyd16sMC",
        },
        {
          shipping_rate: "shr_1QXoBEDxDzTpTbnPQb8Pc7H2",
        },
      ];
    } else if (totalWeight > 2000) {
      shippingOptions = [
        {
          shipping_rate: "shr_1QXo9aDxDzTpTbnPtyd16sMC",
        },
        {
          shipping_rate: "shr_1QXoBEDxDzTpTbnPQb8Pc7H2",
        },
      ];
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      shipping_options: shippingOptions,
      customer_email: user.email ?? undefined,
      success_url:
        process.env.NODE_ENV === "development"
          ? `http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${orderNumber}`
          : `https://gandle-dev.vercel.app/payment/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${orderNumber}`,
      cancel_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/payment/cancel"
          : "https://gandle-dev.vercel.app/payment/cancel",
      metadata: {
        orderNumber: orderNumber,
        userId: user.id,
        orderInfo: JSON.stringify(orderInfo),
      },
    });

    return redirect(session.url as string);
  }
}

