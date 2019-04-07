class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            posts: [],
        }
    }

    fetchPosts() {
        fetch('data/blog_preview.json')
        .then(res => res.json())
        .then(json => {
            this.setState({
                loaded: true,
                posts : json,
            })

        });
    }

    render() {
        var {loaded, posts} = this.state;

        if (!loaded) {
            this.fetchPosts()
            return <div>Loading....</div>
        } else {
            return posts.map(post => {
                return (
                    <PostCard key={post.id} post={post}/>
                );
            });
        }
    }
}

ReactDOM.render(<Blog/>, document.getElementById('root'));