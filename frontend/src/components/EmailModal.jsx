import * as React from 'react';
import { useState, useReducer, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Create } from '@mui/icons-material';


const Transition = React.forwardRef(function Transition(
  props,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EmailModal = () => {
  const [open, setOpen] = useState(false);
  const [aiPrompt, setAIPrompt] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  const initialState = { to: '', cc: '', subject: '', bcc: '', body: '' };
  const reducer = (state, action) => ({
    ...state,
    [action.type]: action.payload
  });
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3001/events');

    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      // Example: server sends { type: "subject", payload: "Meeting Request" }
      //dispatch(data);
      console.log(data);
    }

    return () => {
      eventSource.close();
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}send_email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: state.to,
          cc: state.cc,
          bcc: state.bcc,
          subject: state.subject,
          body: state.body,
        }),
      });

      if (!res.ok) throw new Error("Failed to send email");

      const data = await res.json();
      setOpen(false);
      console.log("✅ Email sent:", data);
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  const startAIDraft = async () => {


  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <Create fontSize='large' />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSend}>
              Send
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <div>
            To: <input className='w-4/12 mr-auto ml-4 bg-transparent outline-none'
              value={state.to}
              onChange={(e) => { dispatch({ type: 'to', payload: e.target.value }) }}
            />
            <Divider />
          </div>
          <div>
            CC: <input className='w-4/12 mr-auto ml-4 bg-transparent outline-none'
              value={state.cc}
              onChange={(e) => { dispatch({ type: 'cc', payload: e.target.value }) }}
            />
            <Divider />
          </div>
          <div>
            BCC: <input className='w-4/12 mr-auto ml-4 bg-transparent outline-none'
              value={state.bcc}
              onChange={(e) => { dispatch({ type: 'bcc', payload: e.target.value }) }} />
            <Divider />
          </div>
          <div>
            Subject: <input className='w-4/12 mr-auto ml-4 bg-transparent outline-none'
              value={state.subject}
              onChange={(e) => { dispatch({ type: 'subject', payload: e.target.value }) }}
            />
            <Divider />
          </div>
          <div className="mt-4">
            <textarea
              className="w-screen h-screen p-3 rounded-lg bg-transparent border border-gray-300 outline-none resize-none"
              placeholder="Write your email here..."
              onChange={(e) => { dispatch({ type: 'body', payload: e.target.value }) }}
            />
          </div>
        </List>
        {/* AI button (fixed bottom-right optional) */}
        <button
          onClick={() => setShowAIModal(true)}
          className="fixed bottom-5 right-5 rounded-full px-4 py-2 shadow-lg bg-indigo-600 text-white"
          title="AI Draft"
        >
          AI ✨
        </button>

        {/* Prompt Modal (minimal) */}
        {showAIModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white text-gray-900 rounded-xl p-4 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-2">Describe the email</h3>
              <input
                className="w-full border border-gray-300 rounded-md p-2 mb-3 outline-none"
                placeholder='e.g., "Follow up on last week’s demo"'
                value={aiPrompt}
                onChange={(e) => setAIPrompt(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-3 py-2 rounded-md border"
                  onClick={() => setShowAIModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-3 py-2 rounded-md bg-indigo-600 text-white"
                  onClick={startAIDraft}
                  disabled={loadingAI}
                >
                  {loadingAI ? "Generating..." : "Generate"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </React.Fragment>
  );
}

export default EmailModal;
