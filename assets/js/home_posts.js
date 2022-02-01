{
    //method to submit form data using AJAX
    let createPost= ()=>{
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                //converts form data to JSON format where content will be key 
                data: newPostForm.serialize(),
                success: function(data){
                   let newPost= newPostDom(data.data.post);
                   $('#posts-list-container>ul').prepend(newPost);
                   //newPost object has .delete-post-button class inside it here delete post button has been given to the deletePost
                    deletePost($(' .delete-post-button', newPost));
                }, error: (error)=>{
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM

    let newPostDom = (post)=>{
        return $(`<li id="post-${ post._id }">
        
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${ post._id }">delete post</a>
            </small>
    
            ${ post.content }
        <br>
        <small>
        ${ post.user.name }
        </small>
        </p>
        <div class="post-comments">
           
                <form action="/comments/create" method="post" >
                    <input type="text" name="content" placeholder="write comment">
                    <input type="hidden" name="post" value="${ post._id}">
                    <input type="submit" value="Add comment">
                </form>
              
    
              <div class="post-comments-list">
                  <ul id="post-comments-${ post._id }">
                      <h4>Comments</h4>
                      
                  </ul>
              </div>  
        </div>
    
    </li>`)
    }


    //method to delete a post from DOM
    let deletePost= (deleteLink)=>{
        $(deleteLink).click((e)=>{
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                 error: function(error){
                     console.log(error.responseText);
                 }

            })
        });


    }

    createPost();
}