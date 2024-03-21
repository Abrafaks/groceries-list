import React from "react";

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
