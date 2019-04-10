class PostCard extends React.Component {
    fetchdetails() {
        const post_id = "data/blog/post-" + this.props.post.id + ".json"

        fetch(post_id)
        .then(res => res.json())
        .then(json => {
            console.log(json)
        });
    }

    clickHandler(e) {
        var id = this.props.post.id
        this.props.cb(id);
    }

    render() {
        const post_id = "post-" + this.props.post.id;

        return (
            <div className="post-card" id={post_id} onClick={this.clickHandler.bind(this)}>
                {<PostImage image={this.props.post.image}/>}
                <div className="post">
                    {<PostTitle title={this.props.post.title}/>}
                    {<PostSnippet snippet={this.props.post.snippet}/>}
                </div>
            </div>
        );
    }
}