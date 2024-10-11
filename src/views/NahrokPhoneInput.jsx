import React, { useState } from 'react'

const NahrokPhoneInput = (props) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    function formatPhoneNumber(input, onChange) {
        if (input.length == 0)
            return;
        // Kullanıcıdan alınan telefon numarasını formatlamak için bir regex kullanarak uygun formata dönüştürüyoruz
        let fixed = input.replace(/\D/g, '');
        if (fixed.length > 0) {
            // İstenen formata göre telefon numarasını düzenliyoruz
            fixed = fixed.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2 $3-$4');
        }
        setPhoneNumber(fixed);
    }
    return (
        <input
            style={{
                padding: '5px',
                margin: '10px'
            }}
            maxLength={12}
            id='phone'
            type='text'
            required
            value={phoneNumber.length > 0 ? phoneNumber : props.value}
            onChange={props.onChange}
            onInput={formatPhoneNumber(props.value, props.onChange)}
        >
        </input>
    );
}

export default NahrokPhoneInput;