import React from "react";

const today = new Date();

const Footer = ({ length }) => {
    return (
        <footer>
            <p>
                You have {length} item{length === 1 ? "" : "s"} in your list
            </p>
        </footer>
    );
};

export default Footer;
