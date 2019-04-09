class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            posts: [],
            postUrl: "",
            blog: "",
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

    renderDetails = (id)=>{
        var post_url = "data/blog/post-" + id + ".json";
        console.log(post_url)
        this.setState({
            postUrl : post_url,
        })
    }

    loadHome() {
        this.setState({
            postUrl: "",
            blog: ""
        })
    }

    render() {
        var {loaded, posts, postUrl, blog} = this.state;

        if (postUrl != "") {
            fetch(postUrl)
            .then(res => res.text())
            .then(json => {
                console.log(json)
                this.setState({
                    blog: json,
                });
            });
        }

        if (blog != "") {
            return (
                <div className="paper" onClick={this.loadHome.bind(this)}>
                    <div class="md" dangerouslySetInnerHTML={{__html: this.state.blog}} />
                </div>
            )
        }

        if (!loaded) {
            var url = 'data/blog_preview.json'
            this.fetchPosts(url)
            return     <div class="footer">
            Under active construction. Maintained and developed by Piyush Itankar.
        </div>
        } else {
            console.log("rendering blog")
            return posts.map(post => {
                return (
                    <PostCard key={post.id} cb={this.renderDetails} post={post}/>
                );
            });
        }
    }
}

ReactDOM.render(<Blog/>, document.getElementById('root'));