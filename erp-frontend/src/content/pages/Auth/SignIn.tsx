import { Box, styled, Container, Stack, TextField, Button, Card, Snackbar } from "@mui/material";
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import MuiAlert from '@mui/material/Alert'
import { useAuth } from "src/utils/auth";
import { useNavigate } from "react-router";

const MainContent = styled(Box)(() => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-display: collumn;
    align-items: center;
    justify-content: center;zz
`);

const SignIn = () => {
    const navigate = useNavigate()
    const [snackBarMessage, setSnackBarMessage] = useState('')
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('')

    const { handleSignIn } = useAuth();

    const handleSignInBtn = async () => {
        if (emailInput == '' || passwordInput == '') {
            setSnackBarMessage('Preencha todos os campos!')
            return
        }

        const requestSingIn = await handleSignIn(emailInput, passwordInput);
        if (requestSingIn.detail) {
            setSnackBarMessage('Email e/ou Senha incorreto(s)')
            return
        }

        navigate('/')
    }

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>

            <Snackbar
                open={snackBarMessage != ''}
                autoHideDuration={6000}
                onClose={() => setSnackBarMessage('')}
            >
                <MuiAlert style={{ color: 'whitesmoke' }} severity="error"></MuiAlert>
            </Snackbar>
            <MainContent>
                <Container maxWidth="sm">
                    <Card
                        sx={{ textAlign: 'center', mt: 3, p: 4 }}
                    >
                        <Stack spacing={3}>
                            <TextField
                                label="Email"
                                type="email"
                                value={emailInput}
                                onChange={e => setEmailInput(e.target.value)}
                            />
                            <TextField
                                label="Senha"
                                type="password"
                                value={passwordInput}
                                onChange={e => setPasswordInput(e.target.value)}
                            />

                            <Button
                                variant="outlined"
                                style={{ marginTop: 40 }}
                                onClick={handleSignInBtn}
                            >
                                Entrar
                            </Button>
                        </Stack>
                    </Card>
                </Container>
            </MainContent>
        </>
    )
}

export default SignIn