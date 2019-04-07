class PostImage extends React.Component {
    render() {
        return(
            <div className="post-img-container">
                <div className="post-img">
                    <img className="post-img" src={this.props.image}/>
                </div>
            </div>
        );
    }
}