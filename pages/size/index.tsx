import MenuLayout from "../../components/MenuLayout";
import SizeGuide from "../../components/SizeGuide";

export default function Home() {
    return (
        <MenuLayout pageName='Ice Street' menu={false} category={false}>
            <SizeGuide />
        </MenuLayout>
    );
}
