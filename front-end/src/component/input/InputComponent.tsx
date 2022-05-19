

function InputComponent({InputType : input}){
    return (
        <input
            type={input.type}
            className={input.className}
            ref={input.ref}
            onChange=
            {
                null === input.onChange ? null : input.onChange
            }
            maxLength={
                null === input.maxLength ? null : input.maxLength
            }   
            placeholder={input.placeholder}    
            />
    )
}
export default InputComponent;