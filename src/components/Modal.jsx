import ReactDom from 'react-dom';

// Modal is basically just a pop up overlay on the screen 
//mane bhabo akta pokemon er description e tar onk skills mention kra oi skill e click krle sei skill tar meaning/description will be displayed as pop up  and as we remove our cursor from the skill the pop up will dissapear
export default function Modal(props){  
    const {children, handleCloseModal}=props
    //the below statement signifies that anything which will be returned here won't get injected in the root div, means this code will not be inside the root div unlike other components, eta main screen theke alada hbe, sudhu jei div e etake push kora hoyeche setatei display hbe , here which is portal. So specifically the Modal content will do this
    return ReactDom.createPortal(
        //this is the modal contner styledx in such a way to fit all the four corne rs of the screen
        <div className='modal-container'> 
            <button onClick={handleCloseModal} className='modal-underlay'>
            <div className='modal-content'>
                {children}
            </div>
            </button>
        </div>,
        document.getElementById('portal')//This line signifies that the above piece of code has been pushed into a div with id portal
    )
}

// 