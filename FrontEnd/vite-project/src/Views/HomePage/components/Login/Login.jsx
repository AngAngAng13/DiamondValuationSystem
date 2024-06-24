import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../../../Context/AuthContext";
import { useNotify } from "../../../../Provider/NotifyProvider";
function Login() {
  const { notifySuccess, notifyError} = useNotify();
  const [show, setShow] = useState(false);
  const [currentState, setCurrentState] = useState("Sign In");
  const [error, setError] = useState("");
  const { currentUser, signIn, signOutUser, signInWithGoogle, signUp, setLoading, loading } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate(); // Hook for navigation

  const handleClose = () => {
    setShow(false);
    setError("");
  };

  const handleShow = () => setShow(true);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (currentState === "Sign In") {
        await signIn(emailRef.current.value, passwordRef.current.value);
        setLoading(true);
        notifySuccess("Successfully logged in");
        
      } else if (currentState === "Sign Up") {
        await signUp(emailRef.current.value, passwordRef.current.value);
        setLoading(true);
        handleClose();
        notifySuccess("Successfully logged in");
      } else {
        notifyError("Error: Something went wrong");
      }
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        notifyError("Invalid password");
      }
      if (error.code === "auth/user-not-found") {
        notifyError("User not found");
      }
      if (error.code === "auth/email-already-in-use") {
        notifyError("Email already in use");
      }
      if (error.code === "auth/weak-password") {
        notifyError("Password is too weak");
      }
      if (error.code === "auth/invalid-email") {
        notifyError("Invalid email");
      }
      if (error.code === "auth/too-many-requests") {
        notifyError("Too many requests. Try again later");
      }
      if (error.code === "auth/user-disabled") {
        notifyError("User account is disabled");
      }
      if (error.code === "auth/invalid-credential") {
        notifyError("Wrong email or password or account does not exist");
      }
      else {
        notifyError(error.message);
      }
    } finally {
      setLoading(false);
      
      
    }
  };

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      handleClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    setError("");
    try {
      await signOutUser();
      setCurrentState("Sign In");
      notifySuccess("Susscessfully sign out")
    } catch (error) {
      setError(error.message);
      notifyError("Error signing out");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      currentUser.getIdTokenResult(true);
      currentUser
        .getIdTokenResult()
        .then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            navigate("/dashboard"); // Redirect to dashboard if user is admin
          } else {
            console.log(idTokenResult.claims);
          }
        })
        .catch((error) => {
          console.error("Error checking admin claim:", error);
        });
    }
  }, [currentUser, navigate]);

  return (
    <>
      <div>
        {currentUser ? (
          <Button variant="primary" onClick={handleSignOut} disabled={loading}>
            {loading ? "Signing Out..." : "Sign Out"}
          </Button>
        ) : (
          <Button variant="primary" onClick={handleShow}>
            Sign In
          </Button>
        )}

        <Modal show={show} onHide={handleClose} style={{ marginTop: "150px" }}>
          <Modal.Header closeButton>
            <h1>{currentState}</h1>
          </Modal.Header>
          <Modal.Body>
            <div style={{ display: "flex", width: "100%", height: "100%" }}>
              <Form onSubmit={handleSignIn}>
                <Form.Group controlId="formEmail">
                  <Form.Control
                    type="email"
                    placeholder="Your email"
                    required
                    style={{
                      outLine: "none",
                      border: "1px solid #c9c9c9",
                      padding: "10px",
                      borderRadius: "4px",
                      marginRight: "1px",
                      width: "100%",
                      marginTop: "15px",
                    }}
                    ref={emailRef}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Control
                    type="password"
                    placeholder="Your password"
                    required
                    style={{
                      outLine: "none",
                      border: "1px solid #c9c9c9",
                      padding: "10px",
                      borderRadius: "4px",
                      marginRight: "1px",
                      width: "100%",
                      marginTop: "15px",
                    }}
                    ref={passwordRef}
                  />
                </Form.Group>
                <Form.Group controlId="formCheckbox" style={{ display: "flex", marginTop: "15px" }}>
                  <Form.Check type="checkbox" required style={{ marginRight: "8px" }} />
                  <Form.Label>By continuing, I agree to the terms of use & privacy policy.</Form.Label>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  style={{
                    display: "block",
                    width: "100%",
                    borderRadius: "10px",
                    marginTop: "15px",
                  }}
                >
                  {loading ? "Loading..." : currentState === "Sign Up" ? "Sign Up" : "Sign In"}
                </Button>
                {currentState === "Sign Up" ? null : (
                  <div>
                    <Button
                      variant="primary"
                      onClick={handleSignInWithGoogle}
                      disabled={loading}
                      style={{
                        display: "block",
                        width: "100%",
                        marginTop: "15px",
                        borderRadius: "10px",
                      }}
                    >
                      {loading ? "Loading..." : "Sign In with Google Account"}
                    </Button>
                  </div>
                )}
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex align-content-center justify-content-center">

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div>
                {currentState === "Sign In" ? (
                  <p>
                    Create a new account?{" "}
                    <span onClick={() => setCurrentState("Sign Up")} style={{ color: "blue", cursor: "pointer" }}>
                      Click here
                    </span>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <span onClick={() => setCurrentState("Sign In")} style={{ color: "blue", cursor: "pointer" }}>
                      Login here
                    </span>
                  </p>
                )}
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Login;
