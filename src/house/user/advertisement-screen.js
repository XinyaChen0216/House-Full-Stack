import AdList from "../advertisement/advertisementList";
import PostAd from "../post-ad";
import { useSelector } from "react-redux";
const AdvertisementScreen = () => {

    const { currentUser } = useSelector((state) => state.user);


    return (
        <>
            <div>
                <h1>Advertisement</h1>
                {currentUser && currentUser["role"] === "admin" && <PostAd />}
                <AdList />
            </div>
        </>
    );
};
export default AdvertisementScreen;