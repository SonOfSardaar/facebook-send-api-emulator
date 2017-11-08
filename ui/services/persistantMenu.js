function PersistantMenu(){
    const base=this;
    base.items=[
        {
            title: "Get Started",
            payload: "{MessageType:'GetStarted'}"
        }, {
            title: "Show Recommendations",
            payload: "{MessageType:'RecsFeed'}"
        }, {
            title: "Show Wishlist",
            payload: "{MessageType:'ShortlistView'}"
        }, {
            title: "Start Over",
            payload: "{MessageType:'StartOver'}"
        }
    ];
}

module.exports = new PersistantMenu()
