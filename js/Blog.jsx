class PostSnippet extends React.Component {
    render() {
        return (
            <div className="post-snippet">
                <p>{this.props.snippet}</p>
            </div>
        );
    }
}

class PostTitle extends React.Component {
    render() {
        return (
            <div className="post-title">
                {this.props.title}
            </div>
        );
    }
}

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

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            posts: [],
            postUrl: "",
            blogLoaded: false
        }
    }

    fetchPosts(url) {
        fetch(url)
        .then(res => res.json())
        .then(json => {
            this.setState({
                loaded: true,
                posts : json,
            })
        });
    }

    copyright() {
        return "© 2019 PI's Blog. Owned and Operated by Piyush Itankar."
    }

    renderDetails = (id)=>{
        var post_url = "data/blog/post-" + id + ".json";
        this.setState({
            postUrl : post_url,
        })
    }

    loadHome = () => {
        this.setState({
            postUrl: "",
            blogLoaded: false,
        })
    }

    render() {
        var {loaded, posts, postUrl, blogLoaded} = this.state;

        if (postUrl != "" && blogLoaded == false) {
            fetch(postUrl)
            .then(res => res.text())
            .then(post => {
                this.setState({
                    blog: post,
                    blogLoaded: true,
                });
            });
            return (
                <div className="ft">
                    Loading...
                </div>)
        }

        if (blogLoaded) {
            return (
                <div className="paper">
                    <div className="md">
                        <div dangerouslySetInnerHTML={{__html: this.state.blog}}></div>
                        <div className="home" onClick={this.loadHome.bind(this)}>
                            <div className="pointer">
                                <i className="material-icons md-48">reply</i>
                            </div>
                        </div>
                        <div className="ft">
                            {this.copyright()}
                        </div>
                    </div>
                </div>
            )
        }

        if (!loaded) {
            var url = 'data/blog_preview.json'
            this.fetchPosts(url)
            return (
                <div className="ft">
                    Loading...
                </div>)
        } else {
            return posts.map(post => {
                return (
                    <PostCard key={post.id} cb={this.renderDetails} post={post}/>
                );
            });
        }
    }
}

ReactDOM.render(<Blog/>, document.getElementById('root'));