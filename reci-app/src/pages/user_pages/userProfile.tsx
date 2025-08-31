import React from "react";
import Navbar from "../../components/app_nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import AppFooter from "../../components/app_footer";
import "./user_pages.css";

const UserProfile: React.FC = () => {
    return (
        <>
            <Navbar>
                <button onClick={() => window.location.href = '/user-home'} className="u_h_button">
                    <FontAwesomeIcon icon={faHome} />
                    <p>Home</p>
                </button>
                <button onClick={() => window.location.href = '/'} className="u_h_button">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />          
                                  <p>Signout</p>
                </button>
            </Navbar>
            <section className="user_home_sec">
                <div className="user_child1">
                    <div className="user_child2">
                        <div className="user_intro_box">
                            <h3>Profile Settings</h3>
                            <p>Manage your account information</p>
                        </div>
                        <div className="usr_ingredients">
                            <div className="ingredients-tags acc_big_box">
                                <div className="acc_info">
                                    <FontAwesomeIcon className="user_acc_info" icon={faUser} />
                                    <p>Account Information</p>
                                </div>
                                <form>
                                    <div>
                                        <div className="edit_form_area">
                                            <div className="profile_edit_box">
                                                <label htmlFor="edit-username">Username</label>
                                                <input type="text" id="edit-username" name="edit-username" placeholder="Enter your new Username" />
                                            </div>
                                        </div>

                                        <div className="profile_edit_box">
                                            <label htmlFor="edit-email">Email</label>
                                            <input type="email" id="edit-email" name="edit-email" placeholder="johndoe@example.com" disabled/>
                                        </div>
                                        <p className="e_c_c">Email cannot be changed. Contact support if you need to update your email.</p>
                                        <button className="edit_profile_form_button">
                                            Edit
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div className="usr_ingredients">
                            <div className="ingredients-tags">
                                <div className="acc_act_big_box">
                                    <div className="acc_actions_h_box">
                                        <p>Account actions</p>
                                    </div>
                                    <div className="s_o_a_box">
                                        <div >
                                            <p className="s_o_hd">Sign out</p>
                                            <p>Sign out of your Recipick account</p>
                                        </div>
                                        <button className="profile_s_o_btn">
                                                <FontAwesomeIcon icon={faArrowAltCircleRight} />
                                                Sign out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="usr_ingredients">
                            <div className="ingredients-tags recipe_stats_box">
                                <div>
                                    <h3 className="recipe_stats_hdng">Your recipe stats</h3>
                                </div>
                                <div className="statistics-recipes_user">
                                    <div>
                                        <h3>12</h3>
                                        <p>Recipes created</p>
                                    </div>
                                    <div>
                                        <h3>8</h3>
                                        <p>Favourites</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <AppFooter></AppFooter>
        </>

    )
}

export default UserProfile;