import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdItem from "./advertisementItem";
import {
    findAdsThunk,
} from "../services/ad-thunks";

const AdList = () => {
    const { ads, loading, reload } = useSelector(
        (state) => state.ads
    );
    const dispatch = useDispatch();

    let totalAds = [...ads];
    useEffect(() => {
        dispatch(findAdsThunk());
    }, [reload]);
    if (loading) {
        return <h3>Loading...</h3>;
    } else {
        return (
            <>
                <ul className="list-group d-flex flex-row flex-wrap justify-content-start">
                    {totalAds.map((ad) => (
                        <AdItem ad={ad} />
                    ))}
                </ul>
            </>
        );
    }
};

export default AdList;
