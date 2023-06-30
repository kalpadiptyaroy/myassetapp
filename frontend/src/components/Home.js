import { FlexboxGrid, Col } from "rsuite";
import SignIn from "./SignIn";
import NavHeader from "./NavHeader";

function Home()
{
    return (
        <>
            <NavHeader />
            <FlexboxGrid align='middle' justify='space-around'>
                <FlexboxGrid.Item as={Col} colspan={12} >
                    <SignIn />
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </>
    );
}

export default Home;