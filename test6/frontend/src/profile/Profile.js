import React, { Component } from 'react';
import LoadingIndicator  from '../common/LoadingIndicator';
import { getUserProfile } from '../util/APIUtils';
import {fetchFav, deleteFavById} from '../util/APIAdmin';
import {Link} from "react-router-dom";
import "./Profile.css";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false,
            favs:[]
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(fno){
        deleteFavById(fno)
            .then(res => {
                this.setState({favs:this.state.favs.filter(fav => fav.fno !== fno)})
            })
    }

    loadUserProfile(username) {
        this.setState({
            isLoading: true
        });

        getUserProfile(username)
        .then(response => {
            this.setState({
                user: response,
                isLoading: false
            }, function(){
                console.log('profile');
                console.log(response);
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        });        
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }        
    }

    render() {

        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

      
       
        return (
            <div className="profile">
                { 
                    this.state.user ? (
                        <div className="profile_container">
                            <div className="user-profile">
                                <div className="user-details">
                                    
                                    <div className="user-summary">
                                        <div className="full-name">{this.state.user.name}</div>
                                        <div className="username">@{this.state.user.username}</div>
                                    </div>
                                </div> 
                            </div>  
                        
                        </div>
                    ): null               
                }
            </div>
        );
    }
}

export default Profile;