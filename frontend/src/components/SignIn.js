import React, { useState } from 'react';
import { FlexboxGrid, Panel, Form, Button, ButtonToolbar } from 'rsuite';
import Cookies from "universal-cookie";


function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userSignedIn, setUserSignedIn] = useState(false);
    const cookies = new Cookies();

    const emailChangeHandler = (event) => setEmail(event.target.value);
    const passwordChangeHandler = (event) => setPassword(event.target.value);

    async function handleSubmit(event)
    {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/api/signin', {
            method: 'POST',
            body: JSON.stringify({"email": email, "password": password}),
            headers: {Accept: "application/json", "Content-Type": "application/json"}
        });
        const jsonResponse = await response.json();
        cookies.remove("TOKEN");
        cookies.set("TOKEN", jsonResponse.user.token, { path: '/'});
        setUserSignedIn(true);
    }

    return (
        <FlexboxGrid justify='center' style={{paddingTop: "50px"}}>
            <FlexboxGrid.Item colspan={18}>
                <Panel header={<h4>Sign In</h4>} bordered>
                    <Form fluid onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.ControlLabel> Username or E-mail </Form.ControlLabel>
                            <Form.Control name="name" onPressEnter={handleSubmit} value={email} onInput={emailChangeHandler}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.ControlLabel> Passoword </Form.ControlLabel>
                            <Form.Control type="password" name="name" onPressEnter={handleSubmit} value={password} onInput={passwordChangeHandler}/>
                        </Form.Group>
                        <Form.Group>
                            <ButtonToolbar>
                                <Button appearance='primary' onClick={handleSubmit}>Sign in</Button>
                                <Button appearance='link'>Forgot Password</Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form>
                </Panel>
            </FlexboxGrid.Item>
        </FlexboxGrid>
        
    );
}

export default SignIn;