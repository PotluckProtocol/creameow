import { TOP_MENU_HEIGHT_PX } from "../components/TopMenu";

const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = TOP_MENU_HEIGHT_PX;
        const elementPosition = element.getBoundingClientRect().top;
        window.scrollTo({
            top: elementPosition + window.pageYOffset - headerOffset,
            behavior: "smooth"
        });
    }
};

export default scrollTo;