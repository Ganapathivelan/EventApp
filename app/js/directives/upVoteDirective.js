(function(){
  'use strict';

  angular.module('upVoteView', [])
         .directive('upVote', [upVoteFn]);

  function upVoteFn(){
    var view = {
      templateUrl: '../templates/directives/UpVoteView.html',
      restrict: 'E',
      scope: {
        onUpVote: '&like',
        onDownVote: '&dislike',
        totalVotes: '=voteTotal'
      }
    };

    return view;
  }


})();
