class PostDate extends React.Component {
    render() {
        return (
            <div className="post-date">
                <em>Published on: {this.props.date}</em>
            </div>
        );
    }
}