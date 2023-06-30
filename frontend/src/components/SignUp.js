import { useState } from "react";
import { Button, ButtonToolbar, FlexboxGrid, Form, Panel } from "rsuite";

function SignUp()
{
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userRegistered, setUserRegistered] = useState(false);

    const fullNameChangeHandler = (event) => setFullName(event.target.value);
    const emailChangeHandler = (event) => setEmail(event.target.value);
    const passwordChangeHandler = (event) => setPassword(event.target.value);
    const confirmPasswordChangeHandler = (event) => setConfirmPassword(event.target.value);
    const signupButtonClickHandler = async (event) => {
        let response;
        try {
            response = await fetch("http://localhost:5000/api/signup", {
                method: 'POST',
                body: JSON.stringify({"fullname": fullname, "email": email, "password": password}),
                headers: { Accept: "application/json","Content-Type": "application/json;charset=UTF-8"}
            }); 
        }
        catch(error)
        {
            console.error("Error in saving user data.");
        }
        response.status === 201 && setUserRegistered(true);
    }


    return (
        <FlexboxGrid justify="space-around" style={{marginTop: "50px"}}>
            <FlexboxGrid.Item colspan={12}>
                <Panel header={<h3>Sign Up and Join us !</h3>} shaded>
                    <Form fluid>
                        <FlexboxGrid justify="space-around" align="middle">
                            <FlexboxGrid.Item colspan={10}>
                                <Form.Group>
                                    <Form.ControlLabel>Fullname</Form.ControlLabel>
                                    <Form.Control name="name" onInput={fullNameChangeHandler} value={fullname} />
                                </Form.Group>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={10}>
                                <Form.Group>
                                    <Form.ControlLabel>Email</Form.ControlLabel>
                                    <Form.Control name='email' onInput={emailChangeHandler} value={email}/>
                                </Form.Group>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                        <FlexboxGrid justify="space-around" align="middle">
                            <FlexboxGrid.Item colspan={10}>
                                <Form.Group>
                                    <Form.ControlLabel>Enter Password</Form.ControlLabel>
                                    <Form.Control name="password" type="password" onInput={passwordChangeHandler} value={password}/>
                                </Form.Group>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={10}>
                                <Form.Group>
                                    <Form.ControlLabel>Re-type Password</Form.ControlLabel>
                                    <Form.Control name="re-enter-password" type="password" onInput={confirmPasswordChangeHandler} value={confirmPassword}/>
                                </Form.Group>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={4} style={{paddingLeft: "10px", paddingTop: "20px"}}>
                                <Form.Group>
                                    <ButtonToolbar>
                                        <Button appearance="primary" onClick={signupButtonClickHandler}>Sign Up</Button>
                                    </ButtonToolbar>
                                </Form.Group>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Form>
                </Panel>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    );
}

export default SignUp;