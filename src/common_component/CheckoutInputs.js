function CheckoutInputs({ setPhoneNumber, setAddress, setCity, setUpazila, setZip_Code }) {

    return (
        <>

            {/* <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        
                                        
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                       
                                        
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    
                                    
                                />
                            </div> */}
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="country" className="form-label">City/District</label>
                    <select
                        className="form-select"
                        id="country"
                        name="country"
                        onChange={(e) => setCity(e.target.value)}

                    >
                        <option value="">Select City/District</option>
                        <option value="Dhaka">Dhaka</option>
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="state" className="form-label">Upazila</label>
                    <select
                        className="form-select"
                        id="state"
                        name="state"
                        onChange={(e) => setUpazila(e.target.value)}

                    >
                        <option value="">Select Upazila</option>
                        <option value="Nawabgonj">Nawabgonj</option>
                        <option value="Dohar">Dohar</option>
                    </select>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address to deliver</label>
                <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div className="row">
                <div className="col-12 mb-3">
                    <label htmlFor="zipCode" className="form-label">ZIP/Postal Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="zipCode"
                        name="zipCode"
                        onChange={(e) => setZip_Code(e.target.value)}
                    />
                </div>
            </div>
            <div className="row">  
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="radio"
                        name=""
                        id=""
                        checked
                    />
                    <label class="form-check-label" for="">
                        Cash On Delivery
                    </label>
                </div>
                <label htmlFor="" className="form-label"></label>
            </div>
            {/* <div className="mb-3 form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="saveAddress"
                    name="saveAddress"
                />
                <label className="form-check-label" htmlFor="saveAddress">
                    Save this address for future use
                </label>
            </div> */}
        </>
    );
}


export default CheckoutInputs