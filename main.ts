import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { FocusActiveSentenceViewPlugin, scrollEventHandler } from 'editorExtension';


interface FocusActiveSentencePluginSettings {
	sentenceDelimiters: string;
	extraCharacters: string;
	titles: string;
}

const DEFAULT_SETTINGS: FocusActiveSentencePluginSettings = {
	sentenceDelimiters: '. |! |? |。|！|？|…',
	extraCharacters: '* |“ |” |‘ |’ |》 |」 |“ |‘ ',
	titles: 
`Mr.\nMs.\nMrs.\nDr.\nProf.\ne.g.\ni.e.\nvs.\na.m.\np.m.\np.s.\nr.s.v.p.\na.s.a.p.\na.k.a.\nA.\nB.\nC.\nD.\nE.\nF.\nG.\nH.\nI.\nJ.\nK.\nL.\nM.\nN.\nO.\nP.\nQ.\nR.\nS.\nT.\nU.\nV.\nW.\nX.\nY.\nZ.\nFr.\nSr.\nJr.\nRev.\nCapt.\nSgt.\nCol.\nGen.\nAdm.\nRep.\nSen.\nGov.\nPres.\nHon.\nMaj.\nCpl.\nLt.\nSupt.\nAmb.\nEsq.\nConst.\nDet.\nInspt.\nPvt.\nCmdr.\nFmr.\nMgr.\nAdm.\nSec.\nTreas.\nDir.\nAtty.\nInsp.\nCdr.\nBp.\nCllr.\nComm.\nBrig.\nEd.\nArch.\nEng.\nSc.\nCom.\nPhil.\nRes.\nEcon.\nAcc.\nCopr.\nLtd.\nInc.\nCo.\nCorp.`
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
