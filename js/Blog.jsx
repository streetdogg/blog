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
                        <div className="st" onClick={this.loadHome.bind(this)}>
                            <div className="pointer">
                            <i className="fa fa-arrow-left"></i>
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