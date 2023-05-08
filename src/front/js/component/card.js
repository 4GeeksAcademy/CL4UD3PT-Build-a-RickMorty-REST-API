import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Card = ({data}) => {
    const {store, actions} = useContext(Context);

    return (
        <div className="col-10 col-sm-6 col-md-4 col-lg-3 mx-auto mx-sm-0">
            <div className="card m-2 p-0">
            {data.image ? <img src={data.image} className="card-img-top" alt="..."/> : null}
                <div className="card-body" style={{minHeight: "13.5rem"}}>
                    <h5 className="card-title">{data.name}</h5>

                    {/* Characters */}
                    {data.gender
                    ?<>
                    <p className="card-text"><strong>Gender:</strong> {data.gender}</p>
                    <p className="card-text"><strong>Status:</strong> {data.status}</p>
                    <p className="card-text"><strong>Species:</strong> {data.species}</p>
                    </>: null}

                    {/* Locations */}
                    {data.dimension
                    ?<>
                    <p className="card-text"><strong>Type:</strong> {data.type}</p>
                    <p className="card-text"><strong>Dimension:</strong> {data.dimension}</p>
                    </>: null}

                    {/* Episodes */}
                    {data.air_date
                    ?<>
                    <p className="card-text"><strong>Air date:</strong> {data.air_date}</p>
                    <p className="card-text"><strong>Episode</strong>: {data.episode}</p>
                    </>: null}

                </div>

                {/* Buttons */}
                <div className="card-footer d-flex justify-content-between align-items-center">
                    <button className={`btn fav-btn fs-4 ${store.favorites.includes(data.name)?"text-danger" : "text-secondary"}`}
                        onClick={()=>{actions.setFavorites(data.name);}}>
                        <i className={`${store.favorites.includes(data.name) ? "fa-solid" : "fa-regular"} fa-heart`}></i>
                    </button>
                    <Link to={"/single/" + store.schema + "/" + data.id}>
                        <button className="btn btn-primary btn-sm py-1">Show info</button>
                    </Link>
                </div>
        </div>
    </div>
    );
};