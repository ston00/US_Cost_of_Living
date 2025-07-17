import React from "react";

class Header extends React.Component {
    render() {
        return(
            <header>
            <div class="container-fluid">
                <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>                        
                </button>
                <a class="navbar-brand" href="Home.js" > Portfolio</a>
                </div>
                <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="Home.js" >Home</a></li>
                    <li><a href="Home.js">About</a></li>
                    <li><a href="Home.js">Gallery</a></li>
                    <li><a href="Home.js">Contact</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="Home.js"> Login</a></li>
                    {/* <span class="glyphicon glyphicon-log-in"></span> */}
                </ul>
                </div>
            </div>
            </header>
        )
    }
}

export default Header;