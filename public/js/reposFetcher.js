$(document).ready(function () {

    alertify.defaults = {
        // dialogs defaults
        autoReset: true,
        basic: false,
        closable: true,
        closableByDimmer: true,
        frameless: false,
        maintainFocus: true, // <== global default not per instance, applies to all dialogs
        maximizable: true,
        modal: true,
        movable: true,
        moveBounded: false,
        overflow: true,
        padding: true,
        pinnable: true,
        pinned: true,
        preventBodyShift: false, // <== global default not per instance, applies to all dialogs
        resizable: true,
        startMaximized: false,
        transition: 'pulse',

        // notifier defaults
        notifier: {
            // auto-dismiss wait time (in seconds)  
            delay: 5,
            // default position
            position: 'bottom-right',
            // adds a close button to notifier messages
            closeButton: false
        },

        // language resources 
        glossary: {
            // dialogs default title
            title: 'AlertifyJS',
            // ok button text
            ok: 'OK',
            // cancel button text
            cancel: 'Cancel'
        },

        // theme settings
        theme: {
            // class name attached to prompt dialog input textbox.
            input: 'ajs-input',
            // class name attached to ok button
            ok: 'ajs-ok',
            // class name attached to cancel button 
            cancel: 'ajs-cancel'
        }
    };

    const loc = window.location.href.split("/");
    const username = loc[loc.length - 1];

    $('#search_input').on('keypress', function (e) {
        if (e.which === 13) {
            showData(username, $('#search_input:text').val())
        }
    });


    showData(username);

});

var GlobalDataStorage = {};

function showData(username, search) {
    $("#table_div").hide();
    $("#hero_content").fadeIn();
    $.get("/getrepos/" + username, { search }).then(function (data) {
        $("#hero_content").hide();
        $("#table_div").fadeIn();
        $("#table_integration").empty();
        data.forEach(e => {
            $("#table_integration").append(`
            <tr>
            <td><a href="${e.url}">${e.name}</a></th>
            <td>${e.description == null ? "No Description" : e.description}</td>
            <td>${e.language == null ? "Unknown" : e.language}</td>
            <td>${e.tags}</td>
            <td id="tag_trigger_${e.full_name}"><a id="trigger_${e.full_name}" href="javascript:EditTags('${e.full_name}', '${e.tags}', '${e.username}');">edit</a></td>
            </tr>`)
        })
    });

}

function EditTags(full_name, tags, username) {
    alertify.prompt('Edit Tags', `Repository: ${full_name}`, tags
        , function (evt, value) {
            $.ajax({
                type: "POST",
                url: "/tags/set",
                data: {
                    tags: value,
                    full_name
                },
                success: 200
            });
            alertify.success(`You edited the tags to : ${value}, refreshing ~!`);
            showData(username, $('#search_input:text').val());
        }
        , function () { alertify.error('Cancel') });
}