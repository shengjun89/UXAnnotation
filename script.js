//需要首选选中序列编号
//添加交互注释
let num = 1;

let res = [];
let pageCountArr = [];
let noteArr = [];
let gutter = 240;
let pageCountWidthArr = [];
let randomContent = ["⭐️始终创业⭐️","⭐️多元兼容⭐️","⭐️坦诚清晰⭐️","⭐️求真务实⭐️","⭐️敢为极致⭐️","⭐️共同成长⭐️"]

selection().forEach((n, i) => {
	//创建数组，保存选中对象的Y坐标，使画布和标记元素纵向对齐
	res.push(n.y);
	n.y = res[0];
	n.clipsContent = false;

	//交互说明画板
	const note: Partial<FrameNode> = {
		name:'Annotation',
		x:0,
		y:n.height+40,
		width:n.width,
		height:400,
		fills:[WHITE.paint],
		layoutMode:'VERTICAL',
		itemSpacing:12,
		horizontalPadding:24,
		verticalPadding:24
	};

	//交互说明标题Frame
	const noteTitle: Partial<FrameNode> = {
		name:'noteTitle',
		fills:[{ type: 'SOLID', color: { r: 0.184313725490196, g: 0.427450980392157, b: 0.988235294117647 } }],
		counterAxisAlignItems:"MIN",
		counterAxisSizingMode:"AUTO",
		layoutMode:"HORIZONTAL",
		itemSpacing:12,
		horizontalPadding:24,
		verticalPadding:16
	};

	//交互说明
	const noteRows: Partial<FrameNode> = {
		name:'noteRows',
		verticalPadding:4,
		itemSpacing:8,
		layoutMode:'HORIZONTAL',
		counterAxisSizingMode:"AUTO",
		counterAxisAlignItems:"CENTER",
		layoutAlign:"STRETCH",
		width:n.width-48,
		primaryAxisAlignItems: "MIN",
		primaryAxisSizingMode: "FIXED"
		// constraints:Object{
		// 	horizontal:"MIN"
		// 	vertical:"MIN"
		// }
	};

	//备注编号
	const BadgeFrame: Partial<FrameNode> = {
		fills:[{ type: 'SOLID', color: { r: 0.184313725490196, g: 0.427450980392157, b: 0.988235294117647 } }],
		counterAxisAlignItems:'CENTER',
		counterAxisSizingMode:'FIXED',
		primaryAxisAlignItems: "CENTER",
		primaryAxisSizingMode: "FIXED",
		layoutMode:'HORIZONTAL',
		layoutAlign: "INHERIT",
		horizontalPadding:12,
		verticalPadding:7,
		cornerRadius:16,
		width:24,
		height:24
	};

	//创建注释文本样式 
	// let badgeFrame :FrameNode =
	// <Frame {...BadgeFrame} name='number'>
	// 	<Text name='number' characters='1' fontSize={12} fills={[{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]} textAutoResize={'WIDTH_AND_HEIGHT'} textAlignHorizontal={'CENTER'} textAlignVertical={'CENTER'} /> 
	// </Frame>


	let frame :FrameNode =
	<Frame {...note}>
		<Frame {...noteTitle}>
			<Text characters='交互说明' fontSize={24} fontName={{family: 'PingFang SC', style: 'Semibold'}} fills={[WHITE.paint]} textAlignVertical={'CENTER'} textAlignHorizontal={'CENTER'} />
		</Frame>
	</Frame>
	addToPage(frame)
	for (let i=0; i<num; i++){
		let index = parseInt(Math.random()*randomContent.length);
		let Annotation :FrameNode =	
		<Frame {...noteRows}>
			<Frame {...BadgeFrame}>
				<Text characters={(i+1).toString()} fontSize={12} fills={[WHITE.paint]} textAlignHorizontal={'CENTER'} textAlignVertical={'CENTER'} />
			</Frame>
			<Text characters={randomContent[index]+'（←该内容为自动生成的文字占位）'}  width ={n.width-86} fontSize={16} textAlignVertical={'TOP'} textAutoResize={'WIDTH_AND_HEIGHT'} layoutAlign={"MAX"} />
		</Frame>
		addToPage(Annotation);
		frame.appendChild(Annotation)
	}
	// n.appendChild(badgeFrame);
	n.appendChild(frame);
	// BadgeFrame
});

//视窗定位到选中对象
figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection);
