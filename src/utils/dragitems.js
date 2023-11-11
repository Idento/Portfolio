import { setCoordinates, setCoordinatesPages } from "../../redux";

export default function DragItem(event, maxh, maxw, dispatch, alignX = 0, alignY=0){
    const text = event.dataTransfer.getData('text');
    const transferredPage = event.dataTransfer.getData('page')
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    if (transferredPage === 'true' && ((mouseX < 200) || (mouseX > (maxw - 200)))) {
        mouseX = mouseX < 200 ? 200 : maxw - 200
    } else if (transferredPage === '' && ((mouseX < 50) || (mouseX > (maxw - 50)))) {
        mouseX = mouseX < 50 ? 50 : maxw - 50
    } else if ((mouseY < 50) || (mouseY > (maxh - 20))) {
        if (transferredPage === 'true') {
            mouseY = mouseY > maxh ? maxh + 20 : 20
        } else {
            mouseY = mouseY > maxh ? maxh + 20 : 50
        }
    }
    transferredPage !== 'true' ?
        dispatch(setCoordinates({ dragText: text, x: mouseX - 50, y: mouseY - 50 }))
        :
        dispatch(setCoordinatesPages({ dragText: text, x: mouseX - alignX, y: mouseY - alignY }))
}