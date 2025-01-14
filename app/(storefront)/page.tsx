import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { FeaturedProducts } from "../components/storefront/FeaturedProducts";
import { Hero } from "../components/storefront/Hero";
import HeroSection from "../components/storefront/HeroSection";
import WorkPres from "../components/storefront/WorkPres";



export default function IndexPage(){
    return(
        
        <div>
            <HeroSection/>
            <CategoriesSelection/>
            <FeaturedProducts/>
            <WorkPres/>
            
        </div>
        
        
    )
}