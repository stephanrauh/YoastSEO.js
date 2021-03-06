import transitionWordsAssessment from "../../js/assessments/transitionWordsAssessment.js";
import Paper from "../../js/values/Paper.js";
import Factory from "../helpers/factory.js";
import Mark from "../../js/values/Mark.js";
let i18n = Factory.buildJed();

describe( "An assessment for transition word percentage", function(){
	let mockPaper, assessment;

	it( "returns the score for 0% of the sentences with transition words", function(){
		let mockPaper = new Paper();
		let assessment = transitionWordsAssessment.getResult( mockPaper, Factory.buildMockResearcher( { totalSentences: 10,
			transitionWordSentences: 0 } ), i18n );

		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual ( "0% of the sentences contain a <a href='https://yoa.st/transition-words' target='_blank'>transition word</a> " +
			"or phrase, which is less than the recommended minimum of 30%." );
		expect( assessment.hasMarks() ).toBe( false );
	} );

	it( "returns the score for a paper with text but no sentences (e.g. only images)", function(){
		let mockPaper = new Paper();
		let assessment = transitionWordsAssessment.getResult( mockPaper, Factory.buildMockResearcher( { totalSentences: 0,
			transitionWordSentences: 0 } ), i18n );

		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual ( "0% of the sentences contain a <a href='https://yoa.st/transition-words' target='_blank'>transition word</a> " +
			"or phrase, which is less than the recommended minimum of 30%." );
		expect( assessment.hasMarks() ).toBe( false );
	} );

	it( "returns the score for 10.0% of the sentences with transition words", function(){
		let mockPaper = new Paper();
		let assessment = transitionWordsAssessment.getResult( mockPaper, Factory.buildMockResearcher( { totalSentences: 10,
			transitionWordSentences: 1 } ), i18n );

		expect( assessment.getScore() ).toEqual( 3 );
		expect( assessment.getText() ).toEqual ( "10% of the sentences contain a <a href='https://yoa.st/transition-words' target='_blank'>transition word</a> " +
			"or phrase, which is less than the recommended minimum of 30%." );
		expect( assessment.hasMarks() ).toBe( true );
	} );
	it( "returns the score for 20.0% of the sentences with transition words", function(){
		let mockPaper = new Paper();
		let assessment = transitionWordsAssessment.getResult( mockPaper, Factory.buildMockResearcher( { totalSentences: 5,
			transitionWordSentences: 1 } ), i18n );

		expect( assessment.getScore() ).toEqual( 6 );
		expect( assessment.getText() ).toEqual ( "20% of the sentences contain a <a href='https://yoa.st/transition-words' target='_blank'>transition word</a> " +
			"or phrase, which is less than the recommended minimum of 30%." );
		expect( assessment.hasMarks() ).toBe( true );
	} );
	it( "returns the score for 25.0% of the sentences with transition words", function(){
		let mockPaper = new Paper();
		let assessment = transitionWordsAssessment.getResult( mockPaper, Factory.buildMockResearcher( { totalSentences: 4,
			transitionWordSentences: 1 } ), i18n );

		expect( assessment.getScore() ).toEqual( 6 );
		expect( assessment.getText() ).toEqual ( "25% of the sentences contain a <a href='https://yoa.st/transition-words' target='_blank'>transition word</a> " +
			"or phrase, which is less than the recommended minimum of 30%." );
		expect( assessment.hasMarks() ).toBe( true );
	} );
	it( "returns the score for 35.0% of the sentences with transition words", function(){
		mockPaper = new Paper();
		assessment = transitionWordsAssessment.getResult( mockPaper, Factory.buildMockResearcher( { totalSentences: 20,
			transitionWordSentences: 7 } ), i18n );
		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual ( "35% of the sentences contain a <a href='https://yoa.st/transition-words' target='_blank'>transition word</a> " +
			"or phrase, which is great." );
		expect( assessment.hasMarks() ).toBe( true );
	} );
	it( "returns the score for 40% sentences with transition words", function(){
		mockPaper = new Paper();
		assessment = transitionWordsAssessment.getResult( mockPaper, Factory.buildMockResearcher( { totalSentences: 10,
			transitionWordSentences: 4 } ), i18n );
		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual ( "40% of the sentences contain a <a href='https://yoa.st/transition-words' target='_blank'>transition word</a> " +
			"or phrase, which is great." );
		expect( assessment.hasMarks() ).toBe( true );
	} );

	it( "returns the score for 47% sentences with transition words", function(){
		mockPaper = new Paper();
		assessment = transitionWordsAssessment.getResult( mockPaper, Factory.buildMockResearcher( { totalSentences: 100,
			transitionWordSentences: 47 } ), i18n );
		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual ( "47% of the sentences contain a <a href='https://yoa.st/transition-words' target='_blank'>transition word</a> " +
			"or phrase, which is great.");
		expect( assessment.hasMarks() ).toBe( true );
	} );

	it( "returns the score for 66.7% of the sentences with transition words", function(){
		mockPaper = new Paper();
		assessment = transitionWordsAssessment.getResult( mockPaper, Factory.buildMockResearcher( { totalSentences: 3,
			transitionWordSentences: 2 } ), i18n );

		expect( assessment.getScore() ).toEqual( 9 );
		expect( assessment.getText() ).toEqual ( "66.7% of the sentences contain a <a href='https://yoa.st/transition-words' target='_blank'>transition word</a> " +
			"or phrase, which is great." );
		expect( assessment.hasMarks() ).toBe( true );
	} );

	it( "is not applicable for empty papers", function(){
		mockPaper = new Paper();
		assessment = transitionWordsAssessment.isApplicable( mockPaper );
		expect( assessment ).toBe( false );
	} );

	it( "is applicable for supported locales, en_US in this case", function(){
		mockPaper = new Paper( "This is a string", { locale: "en_US" } );
		assessment = transitionWordsAssessment.isApplicable( mockPaper );
		expect( assessment ).toBe( true );
	} );

	it( "is not applicable for unsupported locales, xx_YY in this case", function(){
		mockPaper = new Paper( "This is a string", { locale: "xx_YY" } );
		assessment = transitionWordsAssessment.isApplicable( mockPaper );
		expect( assessment ).toBe( false );
	} );
} );

describe( "A test for marking sentences containing a transition word", function() {
	it ("returns markers for too long sentences", function() {
		let paper = new Paper( "This sentence is marked, because it contains a transition word." );
		let transitionWords = Factory.buildMockResearcher( { sentenceResults: [ { sentence: "This sentence is marked, because it contains a transition word.", transitionWords: [ 'because' ] } ] } );
		let expected = [
			new Mark( { original: "This sentence is marked, because it contains a transition word.", marked: "<yoastmark class='yoast-text-mark'>This sentence is marked, because it contains a transition word.</yoastmark>" } )
		];
		expect( transitionWordsAssessment.getMarks( paper, transitionWords ) ).toEqual( expected );
	} );

	it ("returns no markers if no sentences contain a transition word", function() {
		let paper = new Paper( "This sentence is not marked." );
		let transitionWords = Factory.buildMockResearcher( { sentenceResults: [ ] } );
		let expected = [];
		expect( transitionWordsAssessment.getMarks( paper, transitionWords ) ).toEqual( expected );
	} );
} );
