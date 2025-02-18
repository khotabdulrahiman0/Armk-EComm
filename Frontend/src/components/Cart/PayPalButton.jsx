import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const PayPalButton = ({amount,onSuccess,onError}) => {
  return (
    <PayPalScriptProvider options={{"client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID}}>
        <PayPalButtons style={{layout:"vertical"}} createOrder={(data,actions)=>{
            return actions.order.create({
                purchase_units:[{amount:{value:amount.toString()}}]
            })
        }}
        onApprove={(data,actions)=>{
            return actions.order.capture().then(onSuccess)
        }}
        onError={onError} // Fixed: Pass onError function
        />
    </PayPalScriptProvider>
  )
}

export default PayPalButton