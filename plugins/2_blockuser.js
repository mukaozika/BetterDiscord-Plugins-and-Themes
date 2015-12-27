//META{"name":"blockPlugin"}*// Needs https://github.com/Bluscream/BetterDiscord-Plugins-and-Themes/blob/master/plugins/0_BetterAPI.js to work!
function blockPlugin() {}
blockPlugin.prototype.load = function() {
	// $("head").append('<script src="https://cdn.rawgit.com/Bluscream/BetterDiscord-Plugins-and-Themes/master/plugins%2F0_BetterAPI.js"></script>');
};
blockPlugin.prototype.unload = function() {
};
blockPlugin.prototype.start = function() {
    blockUser.blockListe = JSON.parse(localStorage.getItem('blockUserBlockList2')) || {};
    blockUser.forceUpdate = false;
    blockUser.selectedUID = null;
    var getUID = function (e) {
        if (e.target.classList.contains('user-name')) {
            return $(e.target).parents('.message-group').children('.avatar-large').css('backgroundImage').match(/\/(\d{1,})\//)[1];
        } else {
            return $(e.target).attr('data-reactid').match(/\$(\d*)/)[1];
        }
        return null;
    };
	// updateChat = function(){
        // if(Object.keys(blockPlugin.blockList).length > 0 || blockPlugin.forceUpdate){
            // [].slice.call($('.message-group')).forEach(function (message) {
                // $.each( blockPlugin.blockList, function(name, id){
                    // if($(message).children(".avatar-large").first()[0].outerHTML.indexOf(id) > -1){
                        // $(message).css('display', 'none');
                    // } else {
                        // $(message).removeAttr('style');
                    // }
                // });
            // });
        // }
        // if(Object.keys(blockPlugin.blockList).length <= 0 && blockPlugin.forceUpdate) {
            // $('.message-group').removeAttr('style');
        // }
        // blockPlugin.forceUpdate = false;
    // };
	clearBlocklist = function () {
        blockUser.blockListe = {};
        localStorage.setItem('blockUserBlockList2', JSON.stringify(blockUser.blockListe));
        $('#blockUser').remove();
        $('#unblockUser').remove();
        $('#clearblocklistdiv').remove();
        $('#showblocklistdiv').remove();
        blockButtonFunc();
        blockUser.forceUpdate = true;
        updateChat();
    };
    showBlockList = function () {
		var locStore = localStorage.getItem('blockUserBlockList2');
		if (locStore == '{}') {
			infoAlert('Blocklist', 'No users blocked.');
		} else {
			blackAlert('Blocklist', localStorage.getItem('blockUserBlockList2'));
			pluginModule.showSettings("blockPlugin");
		};				
    };
    var updateChat = function () {
        if (Object.keys(blockUser.blockListe).length > 0 || blockUser.forceUpdate) {
            $.each(blockUser.blockListe, function (name, id) {
                [].slice.call($('.message-group')).forEach(function (message) {
                    if ($(message).children(".avatar-large").first()[0].outerHTML.indexOf(id) > -1) {
                        $(message).css('display', 'none');
                    }
                });
            });
        }
        if (Object.keys(blockUser.blockListe).length <= 0 && blockUser.forceUpdate) {
            $('.message-group').removeAttr('style');
            $(".scroller.messages").scrollTop(999999);
        }
        blockUser.forceUpdate = false;
    };
	// var blockListButtonFunc = function() {
		// if (!$('#blockListButton').length) {
			// $('.user-popout-options').append('<button class="btn btn" id="blockListButton">Blocked Users</button>');
			// $('#blockListButton').on("click", function () {
				// var locStore = localStorage.getItem('blockPluginBlockList1');
				// if (locStore == '{}') {
					// infoAlert('Blocklist', 'No users blocked.');
				// } else {
					// blackAlert('Blocklist', localStorage.getItem('blockPluginBlockList1'));
					// 
				// };				
			// });
		// };
	// };
	// var clearblockListButtonFunc = function() {
		// if (!$('#clearblockListButton').length) {
			// var locStore = localStorage.getItem('blockPluginBlockList1');
			// if (locStore != '{}') {
				// $('.user-popout-options').append('<button class="btn btn-server" id="clearblockListButton">Clear Blocked Users</button>');
				// $('#clearblockListButton').on("click", function () {
					// localStorage.setItem('blockPluginBlockList1', '{}');
					// successAlert(blockPlugin.prototype.getName(), "Blocklist has been cleared")
				// });
			// } else {
				// return;
			// };
		// }
	// };
	blockUser = function(username, id) {
			blockUser.blockListe[username] = id;
			localStorage.setItem('blockUserBlockList2', JSON.stringify(blockUser.blockListe));
			blockButtonFunc();
			updateChat();
			successAlert(blockPlugin.prototype.getName() + ' - Success', 'User \"'+username+'\" ('+id+') has been blocked and his/her messages were removed.');
	};
	unblockUser = function(username, id) {
		delete blockUser.blockListe[username];
		localStorage.setItem('blockUserBlockList2', JSON.stringify(blockUser.blockListe));
		blockButtonFunc();
		blockUser.forceUpdate = true;
		updateChat();
		successAlert(blockPlugin.prototype.getName() + " - Success", "User \""+username+"\" ("+id+") has been unblocked and his/her messages were restored.");
	};
    // var blockButtonFunc = function() {
        // if (!$('#blockUser').length && !$('#unblockUser').length) {
            // var username = $(".user-popout").find(".username").text();
            // var id = BetterAPI.getUserIdByName(username);
			// console.info(username)
            // if (!blockPlugin.blockList.hasOwnProperty(username)) {
                // $('.user-popout-options').append('<button class="btn btn-server" id="blockUser">Block</button>');
                // $('#blockUser').on("click", function () {
                    // if(id == null){
						  // errorAlert(blockPlugin.prototype.getName() + ' - Error', 'Can\'t get userID for: \"' + username + '\". \n\nUser needs to be visible in the userlist.');
                        // return;
					// }
					// $.jAlert({
						// 'title': 'Block '+username+'?',
						// 'type': 'confirm',
						// 'confirmQuestion': 'Do you really want to block \"'+username+'\"?',
						// 'theme': 'yellow',
						// 'class': 'btn',
						// 'onConfirm': function(e, btn) { blockUser(username, id) }
					// });
                // });
            // } else {
                // $('.user-popout-options').append('<button class="btn btn-server" id="unblockUser">Unblock</button>');
                // $('#unblockUser').on("click", function () {
					// if(id == null){
						// errorAlert(blockPlugin.prototype.getName() + ' - Error', 'Can\'t get userID for: \"' + username + '\". \n\nUser needs to be visible in the userlist.');
                        // return;
					// }
					// $.jAlert({
						// 'title': 'Unblock '+username+'?',
						// 'type': 'confirm',
						// 'confirmQuestion': 'Do you really want to unblock \"'+username+'\"?',
						// 'theme': 'yellow',
						// 'class': 'btn',
						// 'onConfirm': function(e, btn) { unblockUser(username, id) }
					// });
                // });
            // }
        // }
    // };   
	var blockButtonFunc = function () {
        //noinspection JSJQueryEfficiency
        if (!$('#blockUser').length && !$('#unblockUser').length) {
            var username = $(".user-popout").find(".username").text();
            if (!blockUser.blockListe.hasOwnProperty(username)) {
                $('.user-popout-options').append('<button class="btn btn-server" id="blockUser">Block</button>');
                $('#blockUser').on("click", function () {
                    var id = blockUser.selectedUID;
                    if (id === null) {
                        return;
                    }
                    blockUser.blockListe[username] = id;
                    localStorage.setItem('blockUserBlockList2', JSON.stringify(blockUser.blockListe));
                    $('#blockUser').remove();
                    $('#clearblocklistdiv').remove();
					$('#showblocklistdiv').remove();
                    blockButtonFunc();
                    updateChat();
                });
				BetterAPI.addUserLink("showblocklistdiv", "showblocklist", "#", "Show Blocklist", "clearblocklist", "#", "Clear Blocklist")
				$('#clearblocklist').on('click', function () {
                    clearBlocklist();
                });
                $('#showblocklist').on('click', function () {
                    showBlockList();
                });
            } else {
                $('.user-popout-options').append('<button class="btn btn-server" id="unblockUser">Unblock</button>');
                $('#unblockUser').on("click", function () {
                    delete blockUser.blockListe[username];
                    localStorage.setItem('blockUserBlockList2', JSON.stringify(blockUser.blockListe));
                    $('#unblockUser').remove();
                    $('#clearblocklistdiv').remove();
					$('#showblocklistdiv').remove();
                    blockButtonFunc();
                    $('.message-group').removeAttr('style');
                    blockUser.forceUpdate = true;
                    updateChat();
                });
				BetterAPI.addUserLink("showblocklistdiv", "showblocklist", "#", "Show Blocklist", "clearblocklist", "#", "Clear Blocklist")
                $('#clearblocklist').on('click', function () {
                    clearBlocklist();
                });
                $('#showblocklist').on('click', function () {
                    showBlockList();
                });
            }
        }
    };
//--------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------/*Events*/------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
    $('span[data-reactid=".0.4"]').on('DOMNodeInserted', '.popout', function () {
        blockButtonFunc();
    });
    $('body').on('DOMSubtreeModified', function () {
        updateChat();
        $('.user-name').off('click').on('click', function (e) {
            blockUser.selectedUID = getUID(e);
        });
        $('.member').off('click').on('click', function (e) {
            blockUser.selectedUID = getUID(e);
        });
    });
};
blockPlugin.prototype.getSettingsPanel = function() {
	return '<h3>Blocked Users</h3><br><br>'+localStorage.getItem('blockUserBlockList2');
	// var obj = localStorage.getItem('blockUserBlockList2');
	// var tbl=$("<table/>").attr("id","mytable");
    // $("#div1").append(tbl);
    // for(var i=0;i<obj.length;i++)
    // {
        // var tr="<tr>";
        // var td1="<td>"+obj[i]["id"]+"</td>";
        // var td2="<td>"+obj[i]["name"]+"</td>";
        // var td3="<td>"+obj[i]["color"]+"</td></tr>";
       // $("#mytable").append(tr+td1+td2+td3); 
    // }
};
blockPlugin.prototype.stop = function() {
    $('span[data-reactid=".0.4"]').off('DOMNodeInserted');
    $('body').off('DOMSubtreeModified');
    $('.user-name').off('click');
    $('.member').off('click');
};
blockPlugin.prototype.update = function() {
};
blockPlugin.prototype.getName = function() {
	return "Block User Plugin";
};
blockPlugin.prototype.getDescription = function() {
	return "Adds functionality to block a user";
};
blockPlugin.prototype.getVersion = function() {
	return "1.0";
};
blockPlugin.prototype.getAuthor = function() {
	return "Bluscream";
};