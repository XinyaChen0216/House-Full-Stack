function BuyerSellerPublicInfo(reqProfile) {
  
  return (
        <div>
          <div>
            <label for="firstname" className ="fs-5">First Name</label>
            <span className = "text-primary font-italic form-control bg-light">{" " + reqProfile.firstName}</span>
          </div>
          <div>
            <label for="lastname" className ="fs-5">Last Name</label>
            <span className = "text-primary font-italic form-control bg-light">{" " + reqProfile.lastName}</span>
          </div>
          <div>
            <label className ="fs-5">Role</label>
            <span className = "text-primary font-italic form-control bg-light">{" " + reqProfile.role}</span>
          </div>
        </div>
      )}
export default BuyerSellerPublicInfo;
