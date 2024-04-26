import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import defaultUserImage from '@/assets/user.svg';

const Comments = ({
                      comments,
                      showCommentBox,
                      commentText,
                      handleCommentSubmit,
                      setCommentText,
                      spotifyUserProfile,
                      post
                  }) => {
    const commentsEndRef = useRef(null);

    return (
        <div className="">
            {showCommentBox && (
                <div className="flex items-center justify-between p-3">
                    <input
                        className="flex-grow placeholder-gray-500 text-gray-400 rounded-lg mr-3 bg-tmu border-tmu text-white"
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <button
                        className="bg-tmu text-white rounded-lg text-sm p-2 px-3"
                        onClick={handleCommentSubmit}
                    >
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </button>
                </div>
            )}
            <div className="comments px-4 text-gray-400 mt-3">
                {comments.map((comment, index) => (
                    <div key={index} className="flex start gap-4 w-full mb-2">
                        <div className="flex-shrink-0">
                            {spotifyUserProfile && (
                                <div className="flex items-center font-bold space-x-2">
                                    <img src={post.user.profile_url ? post.user.profile_url : defaultUserImage}
                                         alt="User Profile"
                                         className="rounded-full w-4 h-4"/>
                                    <span>{post.user.name}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex-grow comment">
                            {comment}
                        </div>
                        <FontAwesomeIcon icon={faHeart} className="flex-shrink-0"/>
                    </div>
                ))}
                <div ref={commentsEndRef}/>
            </div>
        </div>
    );
};

export default Comments;
