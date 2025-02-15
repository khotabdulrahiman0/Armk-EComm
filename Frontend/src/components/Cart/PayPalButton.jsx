import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const PayPalButton = ({amount,onSuccess,onError}) => {
  return (
    <PayPalScriptProvider options={{"client-id": "AZujwuAEjbkdVcmtgalur7e60MLU-7rMao4Yy92WWpv_I1j0_XhAWALiCWF5rHPNus1xX2ynwVbdkKY3"}}>
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