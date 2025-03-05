export default function ModalDialog({ children, title, open, onClose }) {
    if(!open) return null;


  return (
    <div style={{height:'100vh', display:'flex'}}>
    
    {
         open &&
         (<>
          <div className="modal-overlay"></div>
          <div className="model-dialog">
          <h1>{title}</h1>
          {children}
          <button 
          onClick={onClose}
          style={{marginTop:'15px',padding:'5px'}}
          >
              Close
            </button>
          </div>
          </>
         )     
    }
    </div>
    
  );
}
