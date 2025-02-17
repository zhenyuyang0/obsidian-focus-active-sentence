import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { FocusActiveSentenceViewPlugin, scrollEventHandler } from 'editorExtension';


interface FocusActiveSentencePluginSettings {
	sentenceDelimiters: string;
	extraCharacters: string;
	titles: string;
}

const DEFAULT_SETTINGS: FocusActiveSentencePluginSettings = {
	sentenceDelimiters: '. |! |? |。|！|？',
	extraCharacters: '* |“ |” |‘ |’ |》 |」 |“ |‘ ',
	titles: 
`Mr.
Ms.
Mrs.
Dr.
Prof.
e.g.
i.e.
vs.
a.m.
p.m.
p.s.
r.s.v.p.
a.s.a.p.
A.
B.
C.
D.
E.
F.
G.
H.
I.
J.
K.
L.
M.
N.
O.
P.
Q.
R.
S.
T.
U.
V.
W.
X.
Y.
Z.
Fr.
So
Sr.
Jr.
Rev.
Capt.
Sgt.
Col.
Gen.
Adm.
Rep.
Sen.
Gov.
Pres.
Hon.
Maj.
Cpl.
Lt.
Supt.
Amb.
Esq.
Const.
Det.
Inspt.
Pvt.
Cmdr.
Fmr.
Mgr.
Adm.
Sec.
Treas.
Dir.
Atty.
Insp.
Cdr.
Bp.
Cllr.
Comm.
Brig.
Ed.
Arch.
Eng.
Sc.
Com.
Phil.
Res.
Econ.
Acc.
copr.
Ltd.`
}

export default class FocusActiveSentencePlugin extends Plugin {
	settings: FocusActiveSentencePluginSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new FocusActiveSentenceSettingTab(this.app, this));

		this.registerEditorExtension(FocusActiveSentenceViewPlugin.extension);
		this.registerEditorExtension(scrollEventHandler);
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


class FocusActiveSentenceSettingTab extends PluginSettingTab {
	plugin: FocusActiveSentencePlugin;

	constructor(app: App, plugin: FocusActiveSentencePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Sentence delimiters')
			.setDesc('Characters that mark the end of a sentence. Default: .!?')
			.addText(text => text
				.setPlaceholder(DEFAULT_SETTINGS.sentenceDelimiters)
				.setValue(this.plugin.settings.sentenceDelimiters)
				.onChange(async (value) => {
					this.plugin.settings.sentenceDelimiters = value;
					await this.plugin.saveSettings();
				}));


		new Setting(containerEl)
			.setName('Extra characters')
			.setDesc('Characters that may follow the end of a sentence, and should be included as part of it. Default: *“”‘’')
			.addText(text => text
				.setPlaceholder(DEFAULT_SETTINGS.extraCharacters)
				.setValue(this.plugin.settings.extraCharacters)
				.onChange(async (value) => {
					this.plugin.settings.extraCharacters = value;
					await this.plugin.saveSettings();
				}));


		new Setting(containerEl)
			.setName('Titles')
			.setDesc('A list of titles ending in a period, e.g. "Mr.", "Ms.", "Mrs.", separated by new lines. Ensures that e.g. "Mr." is not mistakenly identified as the end of a sentence.')
			.addTextArea(text => text
				.setPlaceholder(DEFAULT_SETTINGS.titles)
				.setValue(this.plugin.settings.titles)
				.onChange(async (value) => {
					this.plugin.settings.titles = value;
					await this.plugin.saveSettings();
				}));
	}
}
