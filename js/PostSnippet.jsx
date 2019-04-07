class PostSnippet extends React.Component {
    render() {
        return (
            <div className="post-snippet">
                <p>{this.props.snippet}</p>
            </div>
        );
    }
}