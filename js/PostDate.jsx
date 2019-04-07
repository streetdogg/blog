class PostDate extends React.Component {
    render() {
        return (
            <div className="post-date">
                <em>{this.props.date}</em>
            </div>
        );
    }
}