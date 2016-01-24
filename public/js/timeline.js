$('.timeline-title').click(function () {
    $(this).closest('.timeline-panel').children('.timeline-body').toggle();
});
$(".glyph-info").click(function () {
    var id = $(this).attr('data-id');
    var topic = $(this).attr('data-topic-id');
    var body = $(this).closest('.timeline-panel').children('.timeline-body');
    var message = body.text();
    body.empty();
    body.append(
            '<form action="/editcomment/' + id  + '/' + topic + '" method="post">' +
                '<textarea name="comment" class="well">' +
                    message +
                '</textarea>' +
                '<button type="submit" class="btn btn-default">Comment</button>' +
            '</form>'
            )
});