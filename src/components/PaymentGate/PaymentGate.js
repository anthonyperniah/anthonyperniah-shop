import React from "react";
import {CartContext} from "../Context/CartContext";
import "./PaymenGate.css"
import { Link } from "react-router-dom";
import { orderCreator } from "../../Orders/orderCreator"
import { PaymentCard } from "./PaymentCard";

function PaymentGate() {

    const {products , 
        order, 
        clearCart, 
        totalPrice, 
        setOrder, 
        setOpenLoadingModal,
        paySimulator, 
        setPaySimulator,
        user} = React.useContext(CartContext);

        setOpenLoadingModal(false);



       const wait10SecToSetPayment = () => {
        setTimeout(() => {
            setPaySimulator(false)
            console.log("PaySimulator", paySimulator)
        }, 3000);
        setPaySimulator(true)
        console.log("PaySimulator", paySimulator)
        
    }

        const verifyReadyToPay = () => {
            try{
                if(user.email.length > 0 && user.name.length > 0 && user.phone.length > 0 && products.length > 0 ){
                    return true
                }else{
                    return false
                }
            }catch(err){
                return false
            }

        }

        const pay = () => {
            wait10SecToSetPayment();
            orderCreator(products, 
                order, 
                setOrder, 
                totalPrice,
                user
                )
                //clearCart();
        };

  return (
        <React.Fragment>
            <div className="finish-pay-div">
                {
                    verifyReadyToPay() ?
                    <div>
                    <PaymentCard products={products} totalPrice={totalPrice()}/>
                    <button onClick={()=>pay()} 
                    className="btn btn-primary cart-item-list-button">
                    Finish Payment
                    </button>
                    </div>

                    :
                    <Link to="/"
                    className="btn btn-primary cart-item-list-button">
                    Return to Home
                    </Link>

                }

            </div>


        </React.Fragment>
  );
}

export { PaymentGate };



