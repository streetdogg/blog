class PostCard extends React.Component {
    render() {
        return (
            <div className="post-card">
                {<PostImage image={this.props.post.image}/>}
                <div className="post">
                    {<PostTitle title={this.props.post.title}/>}
                    {<PostDate date={this.props.post.date}/>}
                    {<PostSnippet snippet={this.props.post.snippet}/>}
                </div>
            </div>
        );
    }
}