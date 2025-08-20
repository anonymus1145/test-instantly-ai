import * as React from 'react';
import { useState, useReducer } from 'react';
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
  const [isConnected, setIsConnected] = useState(false);

  const initialState = { to: '', cc: '', subject: '', bcc: '', body: '' };
  const reducer = (state, action) => ({
  ...state,
  [action.type]:
    typeof action.payload === 'function'
      ? action.payload(state[action.type])
      : action.payload,
});

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = async () => {
    try {
      const res = await fetch(`http://localhost:3001/send-email`, {
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
        const eventSource = new EventSource(`http://localhost:3001/event?prompt=${aiPrompt}`);
        setShowAIModal(false);
        setAIPrompt('');

        // Handle incoming messages
       eventSource.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.subject !== undefined) {
             dispatch({ type: 'subject', payload: prev => prev + parsed.subject });
          } else if (parsed.body !== undefined) {
            dispatch({ type: 'body', payload: prev => prev + parsed.body });
          }
        } catch (err) {
          console.error('Error parsing SSE data:', err, 'Raw data:', event.data);
        }
    };
        // Handle connection open
        eventSource.onopen = () => {
            setIsConnected(true);
        };

        // Handle errors
        eventSource.onerror = (error) => {
            console.error('SSE error:', error);
            setIsConnected(false);
            eventSource.close();
        };

        // Clean up on unmount
        return () => {
            eventSource.close();
            setIsConnected(false);
        };
  };

 
return (
  <React.Fragment>
    <Button onClick={handleClickOpen}>
      <Create fontSize="large" />
    </Button>

    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      slots={{ transition: Transition }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            New Email
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSend}>
            Send
          </Button>
        </Toolbar>
      </AppBar>

      <div className="p-8 space-y-6">
        {/* Email Fields */}
        {[
          { label: "To", value: state.to, type: "to" },
          { label: "CC", value: state.cc, type: "cc" },
          { label: "BCC", value: state.bcc, type: "bcc" },
          { label: "Subject", value: state.subject, type: "subject" },
        ].map(({ label, value, type }) => (
          <div key={type}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{label}:</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent outline-none focus:ring-2 focus:ring-indigo-500"
              value={value}
              onChange={(e) => dispatch({ type, payload: e.target.value })}
            />
          </div>
        ))}

        {/* Body */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Body:</label>
          <textarea
            value={state.body}
            className="w-full h-80 p-4 border border-gray-300 rounded-md bg-transparent outline-none resize-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write your email here..."
            onChange={(e) => dispatch({ type: "body", payload: e.target.value })}
          />
        </div>
      </div>

      {/* AI Draft Button */}
      <button
        onClick={() => setShowAIModal(true)}
        className="fixed bottom-6 right-6 rounded-full px-5 py-3 shadow-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
        title="AI Draft"
      >
        AI ✨
      </button>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white text-gray-900 rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-3">Describe the Email</h3>
            <input
              className="w-full border border-gray-300 rounded-md p-3 mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder='e.g., "Follow up on last week’s demo"'
              value={aiPrompt}
              onChange={(e) => setAIPrompt(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
                onClick={() => setShowAIModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
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
