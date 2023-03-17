import './bootstrap';
import $ from 'jquery';
function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
const dataTransfer = new DataTransfer();
window.dataTransfer = dataTransfer;
$('#dosya').on("change", function(e){
    e.preventDefault();
    var html = "";
    Object.values(e.target.files).map(item => {
        dataTransfer.items.add(item);
    });
    Object.values(dataTransfer.files).map((item,key) => {
        console.log(dataTransfer);
        html += template(key, item)
    });
    $("#yuklenenDosyalar").html(html);
});
$(".delete-file").on('click',(e) => {
    e.preventDefault();
    dataTransfer.items.remove($(this).attr('data-id'));
    var html = "";
    Object.values(dataTransfer.files).map(item => {
        html += template(item)
    });
    $("#yuklenenDosyalar").html(html);
})
const template = (key,item) => {
    return `
    <li class="list-group-item file-list-item">
        <div>
            <img src="/images/file.svg" alt="" class="file-list-item-icon">
            <input type="text" value="${item.name}" class="form-control">
        </div>
        <div>
            <span class="badge bg-success">${formatBytes(item.size)}</span>
            <button class="bg-transparent border-0 delete-file" data-id="${key}"><img src="/images/delete.svg" alt="" class="file-list-item-icon"></button>
        </div>
    </li>
    `;
}
