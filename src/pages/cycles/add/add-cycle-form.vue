<template lang="pug">
    #container-add-cycle.q-gutter-y-sm
        //- Top Buttons
        //- div.q-ma-none
        q-btn.full-width.q-mt-md(
          color="positive"
          icon="cloud_download"
          :label="$t('pages.saveSimulation.loadSimulation')"
          @click="showLoadCycle = true"
        )
        q-btn.full-width(
          v-show="showSaveSimulation"
          color="positive"
          icon="save"
          :label="editingMySimulation.status ? $t('pages.saveSimulation.savChanges') : $t('pages.saveSimulation.saveSimulation')"
          @click="showSaveCycle = true"
        )
        q-btn.full-width(
          v-show="showSaveSimulation"
          color="positive"
          icon="restore"
          :label="$t('pages.saveSimulation.resetSimulation')"
          @click="showConfirmCleanSimulation = true"
        )
        //- Form
        q-scroll-area.scroll-container
            .template-form
                q-form.q-gutter-y-sm(
                    ref='simulationForm'
                    @validation-error="formError"
                  )
                    q-list(bordered)
                        //- GPD
                        q-expansion-item(
                            group="formGroup"
                            :label="labelGDP"
                            default-opened
                            header-class="text-positive"
                            dense-toggle
                        )
                          q-card
                            q-card-section.q-gutter-y-sm.q-pr-none
                                //- p Hi {{ volumeGrowth }}
                                //- q-select(
                                //-   filled
                                //-   v-model="GDP_Options.optionSelected"
                                //-   :options="GDP_Options.options"
                                //-   label="Field"
                                //-   placeholder="Select an option"
                                //- )
                                q-expansion-item(
                                  dense-toggle
                                  group="groupGDP"
                                  :label="labelPeopleGrowth"
                                  header-class="text-positive"
                                )
                                  div.q-pr-sm.q-py-xs
                                    money-input(
                                      v-model='numPeopleAccounts'
                                      :label="$t('forms.cycles.numPeopleAccounts')"
                                      :rules="[rules.positiveInteger]"
                                    )
                                    percentage-input(
                                      v-model='peopleGrowth'
                                      :label="$t('forms.cycles.growthPerCycle')"
                                      :rules="[rules.required]"
                                      labelSuffix=''
                                    )
                                    money-input(
                                      v-model='gdpPerPerson'
                                      :label="$t('forms.cycles.gdpPerPerson')"
                                      :rules="[rules.nonNegative]"
                                      seedsIcon
                                    )
                                q-expansion-item(
                                  dense-toggle
                                  group="groupGDP"
                                  :label="labelOrganizationsGrowth"
                                  header-class="text-positive"
                                )
                                  div.q-pr-sm.q-py-xs
                                    money-input(
                                        v-model='numOrganizationAccounts'
                                        :label="$t('forms.cycles.numOrganizationAccounts')"
                                        :rules="[rules.positiveInteger]"
                                    )
                                    percentage-input(
                                        v-model='organizationsGrowth'
                                        :label="$t('forms.cycles.growthPerCycle')"
                                        :rules="[rules.required]"
                                        labelSuffix=''
                                    )
                                    money-input(
                                        v-model='gdpPerOrganisation'
                                        :label="$t('forms.cycles.gdpPerOrganisation')"
                                        :rules="[rules.nonNegative]"
                                        seedsIcon
                                    )
                                q-expansion-item(
                                  dense-toggle
                                  group="groupGDP"
                                  :label="labelBDCGrowth"
                                  header-class="text-positive"
                                )
                                  div.q-pr-sm.q-py-xs
                                    money-input(
                                        v-model='numBdcs'
                                        :label="$t('forms.cycles.numBdcs')"
                                        :rules="[rules.nonNegative]"
                                    )
                                    percentage-input(
                                      v-model='bdcsGrowth'
                                      :label="$t('forms.cycles.growthPerCycle')"
                                      :rules="[rules.required]"
                                      labelSuffix=''
                                    )
                                q-expansion-item(
                                  dense-toggle
                                  group="groupGDP"
                                  :label="labelChangeRequiredToMeetDemand"
                                  header-class="text-positive"
                                )
                                  div.q-pr-sm.q-py-xs
                                    money-input(
                                        v-model='changeRequiredToMeetDemand'
                                        :label="$t('forms.cycles.changeRequiredToMeetDemand')"
                                        :rules="[rules.required]"
                                        :readonly='true'
                                        :bgColor="bgColor"
                                        seedsIcon
                                    )
                                    percentage-input(
                                        v-model='volumeGrowth'
                                        :label="$t('forms.cycles.volumeGrowth')"
                                        :readonly='true'
                                        :bgColor="bgColor"
                                        :rules="[rules.required]"
                                    )
                                //- q-field(filled v-model='numOrganizationAccounts' :label="$t('forms.cycles.numOrganizationAccounts')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                        q-separator
                        //- Seeds Bank
                        q-expansion-item(
                          dense-toggle
                          group="formGroup"
                          :label="labelSeedsBank"
                          header-class="text-positive"
                        )
                          q-card
                            q-card-section.q-gutter-y-sm
                              q-expansion-item(
                                dense-toggle
                                v-show="false"
                                group="groupSeeds"
                                label="Bank"
                                header-class="text-positive"
                              )
                                div.q-pr-sm.q-py-xs
                                  money-input(
                                    v-model='enterSeedsBank'
                                    :label="$t('forms.cycles.enterSeedsBank')"
                                    :rules="[rules.nonNegative]"
                                    seedsIcon
                                  )
                                  money-input(
                                    v-model='exitSeedsBank'
                                    :label="$t('forms.cycles.exitSeedsBank')"
                                    :rules="[rules.nonNegative]"
                                    seedsIcon
                                  )
                              //- q-expansion-item(
                              //-     group="groupSeeds"
                              //-     label="Contracts"
                              //-     header-class="text-positive"
                              //- )
                              //-   div.q-pr-sm.q-py-xs
                              percentage-input(
                                v-model='contractsGrowth'
                                :label="$t('forms.cycles.contractsGrowth')"
                                :rules="[rules.nonNegative]"
                                seedsIcon
                              )
                              percentage-input(
                                  v-model='closedContractsPercentage'
                                  :label="$t('forms.cycles.closedContractsPercentage')"
                                  :rules="[rules.nonNegative]"
                              )
                              money-input(
                                  v-model='seedsPerContract'
                                  :label="$t('forms.cycles.seedsPerContract')"
                                  :rules="[rules.positiveInteger]"
                                  seedsIcon
                              )
                              money-input(
                                  v-model='outstandingContracts'
                                  :label="$t('forms.cycles.outstandingContracts')"
                                  :readonly='true'
                                  :rules="[rules.nonNegative]"
                                  :bgColor="bgColor"
                              )
                              money-input(
                                  v-model='outstandingContractsSeeds'
                                  :label="$t('forms.cycles.outstandingContractsSeeds')"
                                  :readonly='true'
                                  :rules="[rules.nonNegative]"
                                  :bgColor="bgColor"
                                  seedsIcon
                              )
                              money-input(
                                  v-model='contracts'
                                  :label="$t('forms.cycles.contracts')"
                                  :readonly='true'
                                  :rules="[rules.nonNegative]"
                                  :bgColor="bgColor"
                              )
                              money-input(
                                  v-model='contractsSeeds'
                                  :label="$t('forms.cycles.contractsSeeds')"
                                  :readonly='true'
                                  :rules="[rules.nonNegative]"
                                  :bgColor="bgColor"
                                  seedsIcon
                              )
                              money-input(
                                  v-model='closedContracts'
                                  :label="$t('forms.cycles.closedContracts')"
                                  :readonly='true'
                                  :bgColor="bgColor"
                                  :rules="[rules.nonNegative]"
                              )
                              money-input(
                                  v-model='closedContractsSeeds'
                                  :label="$t('forms.cycles.closedContractsSeeds')"
                                  :readonly='true'
                                  :bgColor="bgColor"
                                  :rules="[rules.nonNegative]"
                                  seedsIcon
                              )
                        q-separator
                        //- Seeds Remove
                        q-expansion-item(
                          dense-toggle
                          group="formGroup"
                          :label="labelSeedsRemoves"
                          header-class="text-positive"
                        )
                          q-card
                            q-card-section.q-gutter-y-sm
                                q-expansion-item(
                                  dense-toggle
                                  group="groupSeedsRemove"
                                  :label="labelSeedsRemovesPlanted"
                                  header-class="text-positive"
                                )
                                  div.q-pr-sm.q-py-xs
                                    money-input(
                                      v-model='seedsPlantedPerUserFixed'
                                      :label="$t('forms.cycles.seedsPlantedPerUserFixed')"
                                      :rules="[rules.nonNegative]"
                                      seedsIcon
                                    )
                                    money-input(
                                      v-model='seedsPlantedPerUserVariable'
                                      :label="$t('forms.cycles.seedsPlantedPerUserVariable')"
                                      :rules="[rules.nonNegative]"
                                      seedsIcon
                                    )
                                    money-input(
                                      v-show="true"
                                      v-model='plantedSeeds'
                                      :label="$t('forms.cycles.plantedSeeds')"
                                      :readonly='true'
                                      :bgColor="bgColor"
                                      :rules="[rules.nonNegative]"
                                      seedsIcon
                                    )
                                q-expansion-item(
                                  dense-toggle
                                  group="groupSeedsRemove"
                                  :label="labelSeedsRemovesBurned"
                                  header-class="text-positive"
                                )
                                  div.q-pr-sm.q-py-xs
                                    money-input(
                                        v-model='averageSeedsBurnedPerUser'
                                        :label="$t('forms.cycles.averageSeedsBurnedPerUser')"
                                        :rules="[rules.nonNegative]"
                                        seedsIcon
                                    )
                                    money-input(
                                      v-show="true"
                                      v-model='seedsDestroyed'
                                      :label="$t('forms.cycles.seedsDestroyed')"
                                      :readonly='true'
                                      :bgColor="bgColor"
                                      :rules="[rules.nonNegative]"
                                      seedsIcon
                                    )
                                q-expansion-item(
                                  dense-toggle
                                  group="groupSeedsRemove"
                                  :label="labelEnterExchanges"
                                  header-class="text-positive"
                                )
                                  div.q-pr-sm.q-py-xs
                                    money-input(
                                        v-model='enterExchanges'
                                        :label="$t('forms.cycles.enterExchanges')"
                                        :rules="[rules.nonNegative]"
                                        seedsIcon
                                    )
                                    percentage-input(
                                        v-model='enterExchangesWeight'
                                        :label="$t('forms.cycles.enterExchangesWeight')"
                                        :rules="[rules.nonNegative]"
                                    )
                        q-separator
                        //- Seeds Introduce
                        q-expansion-item(
                          dense-toggle
                          group="formGroup"
                          :label="labelSeedsIntroduce"
                          header-class="text-positive"
                        )
                          q-card
                            q-card-section.q-gutter-y-sm
                                q-expansion-item(
                                  dense-toggle
                                  group="groupSeedsIntroduce"
                                  :label="labelSeedsIntroduceUnplanted"
                                  header-class="text-positive"
                                )
                                  div.q-pr-sm.q-py-xs
                                    money-input(
                                        v-model='unplantedSeedsPerUser'
                                        :label="$t('forms.cycles.unplantedSeedsPerUser')"
                                        :rules="[rules.nonNegative]"
                                        seedsIcon
                                    )
                                    money-input(
                                        v-show="true"
                                        v-model='unplantedSeeds'
                                        :label="$t('forms.cycles.unplantedSeeds')"
                                        :readonly='true'
                                        :bgColor="bgColor"
                                        :rules="[rules.nonNegative]"
                                        seedsIcon
                                    )
                                q-expansion-item(
                                  dense-toggle
                                  group="groupSeedsIntroduce"
                                  :label="labelExitExchanges"
                                  header-class="text-positive"
                                )
                                  div.q-pr-sm.q-py-xs
                                    money-input(
                                        v-model='exitExchanges'
                                        :label="$t('forms.cycles.exitExchanges')"
                                        :rules="[rules.nonNegative]"
                                        seedsIcon
                                    )
                                    percentage-input(
                                        v-model='exitExchangesWeight'
                                        :label="$t('forms.cycles.exitExchangesWeight')"
                                        :rules="[rules.nonNegative]"
                                    )
                        q-separator
                        //- Harvest Distribution
                        q-expansion-item(
                          dense-toggle
                          group="formGroup"
                          :label="$t('forms.cycles.groupHarvestDistribution')"
                          header-class="text-positive"
                        )
                          q-card
                            q-card-section.q-gutter-y-sm
                                percentage-input(
                                    v-model='gdc'
                                    :label="$t('forms.cycles.gdc')"
                                    :rules="[rules.nonNegative]"
                                )
                                //- q-field(filled v-model='gdc' :label="$t('forms.cycles.gdc')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='bdc'
                                    :label="$t('forms.cycles.bdc')"
                                    :rules="[rules.nonNegative]"
                                )
                                //- q-field(filled v-model='bdc' :label="$t('forms.cycles.bdc')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-  @change       input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='organizations'
                                    :label="$t('forms.cycles.organizations')"
                                    :rules="[rules.nonNegative]"
                                )
                                //- q-field(filled v-model='organizations' :label="$t('forms.cycles.organizations')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='accounts'
                                    :label="$t('forms.cycles.accounts')"
                                    :rules="[rules.nonNegative]"
                                )
                                //- q-field(filled v-model='accounts' :label="$t('forms.cycles.accounts')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                        q-separator
                        //- R-DHO Distribution
                        q-expansion-item(
                          dense-toggle
                          group="formGroup"
                          :label="$t('forms.cycles.groupBDCDistribution')"
                          header-class="text-positive"
                        )
                          q-card
                            q-card-section.q-gutter-y-sm
                                percentage-input(
                                    v-model='regenGrantsBDC'
                                    :label="$t('forms.cycles.regenGrantsBDC')"
                                    :rules="[rules.nonNegative]"
                                )
                                //- q-field(filled v-model='regenGrantsBDC' :label="$t('forms.cycles.regenGrantsBDC')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='regenLoans'
                                    :label="$t('forms.cycles.regenLoans')"
                                    :rules="[rules.nonNegative]"
                                )
                                //- q-field(filled v-model='regenLoans' :label="$t('forms.cycles.regenLoans')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='openProposal'
                                    :label="$t('forms.cycles.openProposal')"
                                    :rules="[rules.nonNegative]"
                                )
                                //- q-field(filled v-model='openProposal' :label="$t('forms.cycles.openProposal')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                        q-separator
                        //- G-DHO Distribution
                        q-expansion-item(
                          dense-toggle
                          group="formGroup"
                          :label="$t('forms.cycles.gdho')"
                          header-class="text-positive"
                        )
                          q-card
                            q-card-section.q-pb-none
                              .row
                                .col
                                  // q-input(
                                    :rules="[rules.nonNegative]"
                                    suffix="%"
                                    type="number"
                                    min="0"
                                    max="1"
                                    mask="#.#"
                                    filled
                                    @input="updateDistribution"
                                  // )
                                  percentage-input(
                                    v-model='globalDhoInfo.minimumVotePercentage'
                                    :rules="[rules.nonNegative]"
                                    :label="$t('forms.cycles.min_votes')"
                                    @input="updateDistribution"
                                  )
                            q-card-section
                              template(v-if="globalDhoInfo.dhos.length > 0")
                                .row(v-if="votesAbovePercentage")
                                  .col.q-pa-sm
                                    .text-subtitle2.text-red Total percentage of dhos votes must be 100%.
                                .row.q-mb-xs
                                  .col-2.q-mr-sm
                                  .col
                                    .text-bold.text-left {{ $t('forms.cycles.votes') }}
                                  .col
                                    .text-bold.text-left {{ $t('forms.cycles.distribution') }}
                                  .col-1.q-pb-md
                              template(v-for="(dho,index) in globalDhoInfo.dhos")
                                .row.justify-center.items-center.q-pb-md
                                  .col-2.q-mr-sm.q-py-md
                                    .text {{ dho.name }}
                                  .col
                                    percentage-input.q-pb-none(
                                      v-model='dho.votePercentage'
                                      :rules="[rules.nonNegative]"
                                      :isLabelActive="false"
                                      @input="updateDistribution"
                                    )
                                    // q-input.q-pb-none(
                                      suffix="%"
                                      type="number"
                                      filled
                                      :rules="[rules.nonNegative]"
                                      min="0"
                                      max="1"
                                      mask="#.#"
                                      @input="updateDistribution"
                                    // )
                                  .col
                                    .text.text-center {{ Number.parseFloat(dho.distPercentage * 100).toFixed(2) }}
                                    //percentage-input.q-mr-sm(
                                      :label="$t('forms.cycles.distribution')"
                                      v-model='dho.distribution'
                                      type="number"
                                      filled
                                      :rules="[rules.nonNegative]"
                                    // )
                                  .col-1
                                    q-icon(
                                      name="delete"
                                      v-ripple
                                      size="sm"
                                      color="negative"
                                      @click="deleteDHO(index)"
                                    )
                              .row.justify-end.q-mt-sm
                                q-btn(label="Add DHO" color="positive" @click="addDHOS")
                            // q-card-section.q-gutter-y-sm
                                percentage-input(
                                    v-model='networkMaintenance'
                                    :label="$t('forms.cycles.networkMaintenance')"
                                    :rules="[rules.nonNegative]"
                                )
                                //- q-field(filled v-model='networkMaintenance' :label="$t('forms.cycles.networkMaintenance')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='regenGrantsGDC'
                                    :label="$t('forms.cycles.regenGrantsGDC')"
                                    :rules="[rules.nonNegative]"
                                )
                                //- q-field(filled v-model='regenGrantsGDC' :label="$t('forms.cycles.regenGrantsGDC')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='coreDevelopment'
                                    :label="$t('forms.cycles.coreDevelopment')"
                                    :rules="[rules.nonNegative]"
                                )
                                //- q-field(filled v-model='coreDevelopment' :label="$t('forms.cycles.coreDevelopment')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                                percentage-input(
                                    v-model='interestFreeLoans'
                                    :label="$t('forms.cycles.interestFreeLoans')"
                                    :rules="[rules.nonNegative]"
                                )
                                //- q-field(filled v-model='interestFreeLoans' :label="$t('forms.cycles.interestFreeLoans')")
                                //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                                //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                        q-separator
                        //- Seeds Bank
                        //- q-expansion-item(
                        //-     group="formGroup"
                        //-     label="Select a field"
                        //-     header-class="text-positive"
                        //- )
                        //-   q-card
                        //-     q-card-section.q-gutter-y-sm
                        //-       q-select(
                        //-         filled
                        //-         label="Option Field"
                        //-         v-model="optionField"
                        //-         :options="optionsField"
                        //-       )
                        //-       percentage-input(
                        //-         v-if="fieldType === 'percentage'"
                        //-         v-model='fieldValue'
                        //-         :label="optionField"
                        //-         :rules="[rules.nonNegative]"
                        //-         seedsIcon
                        //-       )
                        //-       money-input(
                        //-         v-if="fieldType === 'money'"
                        //-         v-model='fieldValue'
                        //-         :label="optionField"
                        //-         :rules="[rules.nonNegative]"
                        //-         seedsIcon
                        //-       )
                        //-       p Field value: {{ fieldValue }}
                        //-       p this.peopleGrowth: {{ this.peopleGrowth }}
                              //- money-input(
                              //-       v-model='numPeopleAccounts'
                              //-       :label="$t('forms.cycles.numPeopleAccounts')"
                              //-       :rules="[rules.positiveInteger]"
                              //-   )
                              //-   percentage-input(
                              //-       v-model='peopleGrowth'
                              //-       :label="$t('forms.cycles.peopleGrowth')"
                              //-       :rules="[rules.required]"
                              //-   )
                              //-   money-input(
                              //-       v-model='gdpPerPerson'
                              //-       :label="$t('forms.cycles.gdpPerPerson')"
                              //-       :rules="[rules.nonNegative]"
                              //-       seedsIcon
                              //-   )
                    //- Hidden Fields
                    //- q-field(v-if="!hideFields" filled v-model='percentageOfHarvestAssignedCirculating' :label="$t('forms.cycles.percentageOfHarvestAssignedCirculating')")
                    //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                    //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                    //- q-field(v-if="!hideFields" filled v-model='maxPercentageAccounts' :label="$t('forms.cycles.maxPercentageAccounts')")
                    //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                    //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                    //- q-field(v-if="!hideFields" filled v-model='maxPercentageOrganizations' :label="$t('forms.cycles.maxPercentageOrganizations')")
                    //-     template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                    //-         input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
                    //- q-field(v-if="!hideFields" filled v-model='maxPercentageBdc' :label="$t('forms.cycles.maxPercentageBdc')")
                        template(v-slot:control='{ id, floatingLabel, value, emitValue }')
                            input.c_input(:id='id' :value='value' @change='e => emitValue(e.target.value)' v-money='moneyFormat' v-show='floatingLabel')
        //- Bottom Buttons
        .row.justify-around.items-center
            .column.justify-center
              .col-2
                  q-btn(round :disabled="simulationStep == 0 || simulationStep - 1 == 0" color="positive" icon="keyboard_arrow_left" @click="() => backCycle()")
            .column.justify-center
              .col-6
                p {{simulationStep}} / {{totalSimulationSteps}}
            .column.justify-center
              .col-2
                  q-btn(round color="positive" :disable="votesAbovePercentage" icon="keyboard_arrow_right" @click="() => nextCycle()")
        //- Modals
        q-dialog(v-model="showSaveCycle" persistent)
          q-card(style="min-width: 40vw")
            q-card-section
              p.text-h6.q-ma-none {{titleSaveSimulation}}
            q-separator
            q-card-section
              save-simulation-form(
                @success="onSimulationSaved"
                @cancel="showSaveCycle = false"
              )
        //- Load simulations
        q-dialog(v-model="showLoadCycle")
          q-card.modal-load-simulation
            load-simulation(@cancel="showSaveCycle = false")

        //- Reset Simulation
        //- Confirm modal to load simulation
        q-dialog(v-model="showConfirmCleanSimulation" persistent)
          q-card
            q-card-section
              .row.justify-center
                .col-auto
                  q-avatar.text-center(icon="restore_from_trash" color="primary" text-color="white")
                .col
                  p.text-weight-bold.q-ml-sm.text-center The current simulation {{$t('pages.saveSimulation.cleanSimulationMessage')}}
              p.q-ml-sm.text-center {{$t('pages.general.confirmActions')}}

            q-card-actions.float-right
              q-btn(flat :label="$t('common.buttons.cancel')" color="negative" v-close-popup)
              q-btn(flat :label="$t('common.buttons.confirm')" color="primary" @click="onCleanSimulationData")

</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
// import Vue from 'vue'
import { VMoney } from 'v-money'
import { MoneyInput, PercentageInput } from '~/components/jmInputs'
import SaveSimulationForm from '~/pages/cycles/add/save-simulation-form'
import LoadSimulation from '~/pages/cycles/list/load-simulation'
import { validation } from '~/mixins/validation'
import { calcDhoDistPercentages } from '~/services/harvest'
export default {
  name: 'add-cycle-form',
  directives: { money: VMoney },
  components: { MoneyInput, PercentageInput, SaveSimulationForm, LoadSimulation },
  mixins: [ validation ],
  data () {
    return {
      showSaveCycle: false,
      showLoadCycle: false,
      showConfirmCleanSimulation: false,
      bgColor: 'light-green-3',
      price: 0,
      moneyFormat: {
        decimal: '.',
        thousands: ',',
        precision: 2
      },
      totalGDP: 0,
      changeRequiredToMeetDemand: 0,
      volumeGrowth: 0,
      // changeRequiredToMeetDemand: 33339041.096,
      seedsDestroyed: 0,
      plantedSeeds: 0,
      enterExchanges: '',
      enterExchangesWeight: '',
      enterSeedsBank: 0,
      // seedsRemoved3Cycles: 26681232.878,
      unplantedSeeds: 0,
      exitExchanges: '',
      exitExchangesWeight: '',
      exitSeedsBank: 0,
      percentageOfHarvestAssignedCirculating: 0,
      // Interface - START percentageDistributionOfNewHarvest
      gdc: 0,
      bdc: 0,
      organizations: 0,
      accounts: 0,
      // -END
      maxPercentageAccounts: 0,
      maxPercentageOrganizations: 0,
      maxPercentageBdc: 0,
      // Interface - Start bdcPercentagesDistribution
      regenGrantsBDC: 0,
      regenLoans: 0,
      openProposal: 0,
      // -END
      // Interface - Start gdcPercentagesDistribution
      networkMaintenance: 0,
      regenGrantsGDC: 0,
      coreDevelopment: 0,
      interestFreeLoans: 0,
      // -END
      numPeopleAccounts: 0,
      peopleGrowth: 0,
      gdpPerPerson: 0,
      numOrganizationAccounts: 0,
      organizationsGrowth: 0,
      gdpPerOrganisation: 0,
      numBdcs: 0,
      bdcsGrowth: 0,
      // - Variables
      hideFields: true,
      // - Seeds Bank
      contracts: 0,
      contractsSeeds: 0,
      contractsGrowth: 0,
      outstandingContracts: '',
      outstandingContractsSeeds: '',
      seedsPerContract: 0,
      closedContracts: 0,
      closedContractsSeeds: 0,
      closedContractsPercentage: 0,
      seedsPlantedPerUserFixed: 0,
      seedsPlantedPerUserVariable: 0,
      averageSeedsBurnedPerUser: 0,
      unplantedSeedsPerUser: 0,
      totals: undefined,
      globalDhoInfo: {
        dhos: [],
        minimumVotePercentage: 0
      }
    }
  },
  computed: {
    ...mapGetters('harvest', ['simulationStep', 'totalSimulationSteps', 'cycleDataForm', 'getSimulationState']),
    ...mapState('simulations', ['editingMySimulation']),
    ...mapGetters('accounts', ['isGuest', 'isAuthenticated']),
    titleSaveSimulation () {
      return this.editingMySimulation.status ? this.$t('pages.saveSimulation.updateSimulations') : this.$t('pages.saveSimulation.saveSimulation')
    },
    labelSeedsRemoves () {
      return this.getSimulationState.length > 1 ? this.$t('forms.cycles.groupSeedsRemove') + ': ' + this.formatToMoney(this.getSimulationState[this.simulationStep].seedsRemovedDuringCycle.toFixed(0)) : this.$t('forms.cycles.groupSeedsRemove')
    },
    labelSeedsIntroduce () {
      return this.getSimulationState.length > 1 ? this.$t('forms.cycles.groupSeedsIntroduce') + ': ' + this.formatToMoney(this.getSimulationState[this.simulationStep].seedsIntroducedDuringCycle.toFixed(0)) : this.$t('forms.cycles.groupSeedsIntroduce')
    },
    labelSeedsBank () {
      return this.getSimulationState.length > 1 ? this.$t('forms.cycles.groupSeedsBank') + ': ' + this.formatToMoney(this.getSimulationState[this.simulationStep].bankContractsDuringCycleSeeds.toFixed(0)) : this.$t('forms.cycles.groupSeedsBank')
    },
    labelGDP () {
      return this.getSimulationState.length > 1 ? this.$t('forms.cycles.groupGDP') + ': ' + this.formatToMoney(this.getSimulationState[this.simulationStep].totalGDP.toFixed(0)) : this.$t('forms.cycles.groupGDP')
    },
    labelPeopleGrowth () {
      return this.getSimulationState.length > 1 ? this.$t('forms.cycles.peopleGrowth') + ': ' + this.formatToMoney(this.getSimulationState[this.simulationStep].peopleGrowthLabel.toFixed(0)) : this.$t('forms.cycles.peopleGrowth')
    },
    labelOrganizationsGrowth () {
      return this.getSimulationState.length > 1 ? this.$t('forms.cycles.orgGrowth') + ': ' + this.formatToMoney(this.getSimulationState[this.simulationStep].organizationsGrowthLabel.toFixed(0)) : this.$t('forms.cycles.orgGrowth')
    },
    labelEnterExchanges () {
      return this.getSimulationState.length > 1 ? this.$t('forms.cycles.enterExchanges') + ': ' + this.formatToMoney(this.getSimulationState[this.simulationStep].enterExchangesLabel.toFixed(0)) : this.$t('forms.cycles.enterExchanges')
    },
    labelExitExchanges () {
      return this.getSimulationState.length > 1 ? this.$t('forms.cycles.exitExchanges') + ': ' + this.formatToMoney(this.getSimulationState[this.simulationStep].exitExchangesLabel.toFixed(0)) : this.$t('forms.cycles.exitExchanges')
    },
    labelBDCGrowth () {
      // console.log(this.getSimulationState[this.simulationStep].numBdcs.toFixed(0), '111111')
      return this.getSimulationState.length > 1 ? this.$t('forms.cycles.bdcGrowth') + ': ' + this.formatToMoney(this.getSimulationState[this.simulationStep].numBdcs.toFixed(0)) : this.$t('forms.cycles.bdcGrowth')
    },
    labelChangeRequiredToMeetDemand () {
      return this.getSimulationState.length > 1 ? this.$t('forms.cycles.changeRequiredToMeetDemand') + ': ' + this.formatToMoney(this.getSimulationState[this.simulationStep].changeRequiredToMeetDemand.toFixed(0)) : this.$t('forms.cycles.changeRequiredToMeetDemand')
    },
    labelSeedsRemovesPlanted () {
      return this.getSimulationState.length > 1 ? this.$t('forms.cycles.planted') + ': ' + this.formatToMoney(this.getSimulationState[this.simulationStep].plantedSeedsDuringCycle.toFixed(0)) : this.$t('forms.cycles.planted')
    },
    labelSeedsIntroduceUnplanted () {
      return this.getSimulationState.length > 1 ? this.$t('forms.cycles.unplanted') + ': ' + this.formatToMoney(this.getSimulationState[this.simulationStep].unplantedSeeds.toFixed(0)) : this.$t('forms.cycles.unplanted')
    },
    labelSeedsRemovesBurned () {
      return this.getSimulationState.length > 1 ? this.$t('forms.cycles.burned') + ': ' + this.formatToMoney(this.getSimulationState[this.simulationStep].burnedSeedsDuringCycle) : this.$t('forms.cycles.burned')
    },
    showSaveSimulation () {
      return (this.getSimulationState.length > 1 && (this.isAuthenticated))
    },
    votesAbovePercentage () {
      const totalPercentage = this.globalDhoInfo.dhos.map(dho => dho.votePercentage.value).reduce((acc, curr) => Number(acc) + Number(curr), 0)
      return totalPercentage !== 1
    }
  },
  async beforeMount () {
    // await this.onInit()
    // this.syncFormData()
  },
  async mounted () {
    this.$store.$EventBus.$on('simulation-applied', () => {
      console.log('Event bus listened, loadSimulation closed')
      this.showLoadCycle = false
    })
    try {
      // this.onInit()
      // await this.onInit()
      this.syncFormData()
    } catch (error) {
      console.error('Errrroooorr', error)
    }
  },
  beforeDestroy () {
    this.$store.$EventBus.$off('simulation-applied')
  },
  watch: {
    simulationStep (currentStep, prevStep) {
      console.log('Form data syncronized', prevStep)
      this.syncFormData()
    },
    // Set real value to temp value
    optionField () {
      let newValue
      switch (this.optionField) {
        case this.$t('forms.cycles.numPeopleAccounts'):
          newValue = this.numPeopleAccounts
          break
        case this.$t('forms.cycles.peopleGrowth'):
          newValue = this.peopleGrowth.value
          break
        case this.$t('forms.cycles.gdpPerPerson'):
          newValue = this.gdpPerPerson
          break
        default:
          newValue = undefined
      }
      this.fieldValue = newValue
    },
    // Set temp value to real value
    fieldValue () {
      switch (this.optionField) {
        case this.$t('forms.cycles.numPeopleAccounts'):
          this.numPeopleAccounts = this.fieldValue
          break
        case this.$t('forms.cycles.peopleGrowth'):
          this.peopleGrowth = this.fieldValue
          break
        case this.$t('forms.cycles.gdpPerPerson'):
          this.gdpPerPerson = this.fieldValue
          break
        default:
          console.warn('Not case found on fieldValue watch')
      }
    },
    gdpPerPerson () {
      this.changeDataStatesInitTable()
    },
    numPeopleAccounts () {
      this.changeDataStatesInitTable()
    },
    gdpPerOrganisation () {
      this.changeDataStatesInitTable()
    },
    numOrganizationAccounts () {
      this.changeDataStatesInitTable()
    }
  },
  methods: {
    ...mapActions('harvest', ['getInitSimulationStep', 'doCycle', 'initState']),
    ...mapActions('simulations', ['cleanSimulationData']),
    ...mapMutations('harvest', ['setSimulationStep', 'setDataStatesInitTable']),
    changeDataStatesInitTable () {
      if (this.totalSimulationSteps > 1) return
      let newData = {
        totalCirculatingSeeds: 1256637061,
        totalSeedsPlanted: 1256637061,
        totalSeedsBurned: 0,
        totalSeeds: 3141592653,
        // totalGEV: 1000,
        // totalGEV: (gdpPerPerson * numPeopleAccounts) +  (gdpPerOrganisation * numOrganizationAccounts),
        totalGEV: (this.gdpPerPerson.value * this.numPeopleAccounts.value) + (this.gdpPerOrganisation.value * this.numOrganizationAccounts.value)
      }
      this.setDataStatesInitTable(newData)
    },
    async onInit () {
      const simulationState = {
        changeRequiredToMeetDemand: this.changeRequiredToMeetDemand.value,
        volumeGrowth: this.volumeGrowth.value,
        totalGDP: this.totalGDP,
        // ==== new values ==== //
        gdpPerPerson: this.gdpPerPerson.value,
        gdpPerOrganisation: this.gdpPerOrganisation.value,
        // changeRequiredToMeetDemand: 33339041.096,
        seedsDestroyed: this.seedsDestroyed.value,
        plantedSeeds: this.plantedSeeds.value,
        enterExchanges: this.enterExchanges.value,
        enterExchangesWeight: this.enterExchangesWeight.value,
        enterSeedsBank: this.enterSeedsBank.value,
        // seedsRemoved3Cycles: 26681232.878,
        unplantedSeedsPerUser: this.unplantedSeedsPerUser.value,
        unplantedSeeds: this.unplantedSeeds.value,
        exitExchanges: this.exitExchanges.value,
        exitExchangesWeight: this.exitExchangesWeight.value,
        exitSeedsBank: this.exitSeedsBank.value,
        // seedsIntroducedPrevious3Cycles: 14669178.079,
        // seedsGrownPerCycle: 15117031.964999998,
        percentageOfHarvestAssignedCirculating: parseFloat(this.percentageOfHarvestAssignedCirculating),
        percentageDistributionOfNewHarvest: { gdc: this.gdc.value, bdc: this.bdc.value, organizations: this.organizations.value, accounts: this.accounts.value, dhos: this.gdc.value },
        maxPercentageAccounts: parseFloat(this.maxPercentageAccounts),
        maxPercentageOrganizations: parseFloat(this.maxPercentageOrganizations),
        maxPercentageBdc: parseFloat(this.maxPercentageBdc),
        bdcPercentagesDistribution: { regenGrants: this.regenGrantsBDC.value, regenLoans: this.regenLoans.value, openProposal: this.openProposal.value },
        gdcPercentagesDistribution: {
          networkMaintenance: this.networkMaintenance.value,
          regenGrants: this.regenGrantsGDC.value,
          coreDevelopment: this.coreDevelopment.value,
          interestFreeLoans: this.interestFreeLoans.value
        },
        totals: this.totals,
        numPeopleAccounts: this.numPeopleAccounts.value,
        peopleGrowth: this.peopleGrowth.value,
        seedsPlantedPerUserFixed: this.seedsPlantedPerUserFixed.value,
        seedsPlantedPerUserVariable: this.seedsPlantedPerUserVariable.value,
        averageSeedsBurnedPerUser: this.averageSeedsBurnedPerUser.value,
        numOrganizationAccounts: this.numOrganizationAccounts.value,
        organizationsGrowth: this.organizationsGrowth.value,
        numBdcs: this.numBdcs.value,
        bdcsGrowth: this.bdcsGrowth.value,
        contractsGrowth: this.contractsGrowth.value,
        newContractsDuringCycle: this.contracts.value,
        outstandingContractsSeeds: this.outstandingContractsSeeds.value,
        outstandingContracts: this.outstandingContracts.value,
        closedContractsPercentage: this.closedContractsPercentage.value,
        seedsPerContract: this.seedsPerContract.value
        // harvestDistribution: {}
      }
      console.warn('Se llamo InitState!!!', 'Lugar 0')
      this.initState({
        simulationState
      })
      console.log('Inited!')
    },
    async onCleanSimulationData () {
      try {
        this.showConfirmCleanSimulation = false
        this.showIsLoading(true)
        await this.cleanSimulationData()
        await this.sleep(400)
        this.showNotification('Simulation restored')
        this.showIsLoading(false)
      } catch (error) {
        this.showNotification(error, 'error')
      }
    },
    onSimulationSaved () {
      this.showSaveCycle = false
      this.showNotification(this.$t('pages.saveSimulation.simulationSaved'))
    },
    formatMoney (val1) {
      let val = Math.round(val1)
      if (val !== undefined) {
        let sign = false
        if (val < 0) {
          sign = true
          val = val * (-1)
        }
        let formated = val.toString()
        let point = formated.indexOf('.')
        let count = 0
        let newFormated = formated.substring(point).split('').reverse().join('')
        for (let i = point - 1; i >= 0; i--) {
          if (count === 3) {
            newFormated += ','
            count = 1
          } else {
            count += 1
          }
          newFormated += formated[i]
        }
        if (sign) {
          newFormated += '-'
        }
        return newFormated.split('').reverse().join('')
      }
      return ''
    },
    async backCycle () {
      // console.log('Before back:', this.getSimulationState)
      this.showIsLoading(true)
      await this.sleep(100)
      this.setSimulationStep((this.simulationStep - 1))
      this.showIsLoading(false)
      // console.log('After back:', this.getSimulationState)
    },
    formError (ref) {
      // console.log('Error Form', ref.label)
      let parent = ref.$parent
      while (parent && !parent.show) {
        parent = parent.$parent
      }
      console.log('Expander found', parent.label)
      // switch (parent.label) {
      //   case this.labelGDP:
      //     this.GDP_Options.optionSelected = ref.label
      //     break
      //   case this.labelSeedsBank:
      //     console.log('Label Seeds here!')
      //     this.SeedsBank_Options.optionSelected = ref.label
      //     break
      //   case this.labelSeedsRemoves:
      //     this.SeedsRemoves_Options.optionSelected = ref.label
      //     break
      //   case this.labelSeedsIntroduce:
      //     this.SeedsIntroduce_Options.optionSelected = ref.label
      //     break
      //   case this.$t('forms.cycles.groupHarvestDistribution'):
      //     this.HarvestDistribution_Options.optionSelected = ref.label
      //     break
      //   case this.$t('forms.cycles.groupBDCDistribution'):
      //     this.BDCDistribution_Options.optionSelected = ref.label
      //     break
      //   case this.$t('forms.cycles.groupGDCDistribution'):
      //     this.GDCDistribution_Options.optionSelected = ref.label
      //     break
      //   default:
      //     break
      // }
      parent && parent.show()
    },
    nextCycle () {
      this.$refs.simulationForm.validate(true).then(async success => {
        if (success) {
          this.showIsLoading(true)
          this.$nextTick()
          await this.sleep(100)
          // console.log('Before next:', JSON.stringify(this.getSimulationState, null, 4))
          console.log('DoCycle Init:', this)
          const simulationState = {
            changeRequiredToMeetDemand: this.changeRequiredToMeetDemand.value,
            volumeGrowth: this.volumeGrowth.value,
            totalGDP: this.totalGDP,
            // ==== new values ==== //
            gdpPerPerson: this.gdpPerPerson.value,
            gdpPerOrganisation: this.gdpPerOrganisation.value,
            // changeRequiredToMeetDemand: 33339041.096,
            seedsDestroyed: this.seedsDestroyed.value,
            plantedSeeds: this.plantedSeeds.value,
            enterExchanges: this.enterExchanges.value,
            enterExchangesWeight: this.enterExchangesWeight.value,
            enterSeedsBank: this.enterSeedsBank.value,
            // seedsRemoved3Cycles: 26681232.878,
            unplantedSeedsPerUser: this.unplantedSeedsPerUser.value,
            unplantedSeeds: this.unplantedSeeds.value,
            exitExchanges: this.exitExchanges.value,
            exitExchangesWeight: this.exitExchangesWeight.value,
            exitSeedsBank: this.exitSeedsBank.value,
            // seedsIntroducedPrevious3Cycles: 14669178.079,
            // seedsGrownPerCycle: 15117031.964999998,
            percentageOfHarvestAssignedCirculating: parseFloat(this.percentageOfHarvestAssignedCirculating),
            percentageDistributionOfNewHarvest: { gdc: this.gdc.value, bdc: this.bdc.value, organizations: this.organizations.value, accounts: this.accounts.value, dhos: this.gdc.value },
            maxPercentageAccounts: parseFloat(this.maxPercentageAccounts),
            maxPercentageOrganizations: parseFloat(this.maxPercentageOrganizations),
            maxPercentageBdc: parseFloat(this.maxPercentageBdc),
            bdcPercentagesDistribution: { regenGrants: this.regenGrantsBDC.value, regenLoans: this.regenLoans.value, openProposal: this.openProposal.value },
            gdcPercentagesDistribution: {
              networkMaintenance: this.networkMaintenance.value,
              regenGrants: this.regenGrantsGDC.value,
              coreDevelopment: this.coreDevelopment.value,
              interestFreeLoans: this.interestFreeLoans.value
            },
            totals: this.totals,
            numPeopleAccounts: this.numPeopleAccounts.value,
            peopleGrowth: this.peopleGrowth.value,
            seedsPlantedPerUserFixed: this.seedsPlantedPerUserFixed.value,
            seedsPlantedPerUserVariable: this.seedsPlantedPerUserVariable.value,
            averageSeedsBurnedPerUser: this.averageSeedsBurnedPerUser.value,
            numOrganizationAccounts: this.numOrganizationAccounts.value,
            organizationsGrowth: this.organizationsGrowth.value,
            numBdcs: this.numBdcs.value,
            bdcsGrowth: this.bdcsGrowth.value,
            contractsGrowth: this.contractsGrowth.value,
            newContractsDuringCycle: this.contracts.value,
            outstandingContractsSeeds: this.outstandingContractsSeeds.value,
            outstandingContracts: this.outstandingContracts.value,
            closedContractsPercentage: this.closedContractsPercentage.value,
            seedsPerContract: this.seedsPerContract.value,
            globalDhoInfo: this.formatValues()
            // harvestDistribution: {}
          }
          console.log('DoCycle Data:', simulationState, this.bdcsGrowth)
          await this.doCycle(
            {
              simulationState, step: (this.simulationStep)
            })
          this.showIsLoading(false)
        }
      })
    //   console.log('After next:', this.getSimulationState)
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    syncFormData () {
      //   console.log('Before Sync Form:', this.getSimulationState)
      console.log('Before Sync Form: volumeGrowth ', this.cycleDataForm)
      if (this.cycleDataForm === undefined) return
      this.changeRequiredToMeetDemand = parseFloat(this.cycleDataForm.changeRequiredToMeetDemand)
      this.volumeGrowth = parseFloat(this.cycleDataForm.volumeGrowth).toFixed(4)
      this.seedsDestroyed = parseFloat(this.cycleDataForm.burnedSeedsDuringCycle)
      this.plantedSeeds = parseFloat(this.cycleDataForm.plantedSeedsDuringCycle)
      this.enterExchanges = parseFloat(this.cycleDataForm.enterExchanges)
      this.enterExchangesWeight = parseFloat(this.cycleDataForm.enterExchangesWeight)
      this.enterSeedsBank = parseFloat(this.cycleDataForm.enterSeedsBank)
      this.unplantedSeeds = parseFloat(this.cycleDataForm.unplantedSeeds).toFixed(2)
      this.exitExchanges = parseFloat(this.cycleDataForm.exitExchanges)
      this.exitExchangesWeight = parseFloat(this.cycleDataForm.exitExchangesWeight)
      this.exitSeedsBank = parseFloat(this.cycleDataForm.exitSeedsBank)
      this.percentageOfHarvestAssignedCirculating = parseFloat(this.cycleDataForm.percentageOfHarvestAssignedCirculating).toFixed(2)
      this.gdc = parseFloat(this.cycleDataForm.percentageDistributionOfNewHarvest.gdc)
      this.bdc = parseFloat(this.cycleDataForm.percentageDistributionOfNewHarvest.bdc)
      this.organizations = parseFloat(this.cycleDataForm.percentageDistributionOfNewHarvest.organizations)
      this.accounts = parseFloat(this.cycleDataForm.percentageDistributionOfNewHarvest.accounts)
      this.maxPercentageAccounts = parseFloat(this.cycleDataForm.maxPercentageAccounts).toFixed(2)
      this.maxPercentageOrganizations = parseFloat(this.cycleDataForm.maxPercentageOrganizations).toFixed(2)
      this.maxPercentageBdc = parseFloat(this.cycleDataForm.maxPercentageBdc).toFixed(2)
      this.regenGrantsBDC = parseFloat(this.cycleDataForm.bdcPercentagesDistribution.regenGrants)
      this.regenLoans = parseFloat(this.cycleDataForm.bdcPercentagesDistribution.regenLoans)
      this.openProposal = parseFloat(this.cycleDataForm.bdcPercentagesDistribution.openProposal)
      this.networkMaintenance = parseFloat(this.cycleDataForm.gdcPercentagesDistribution.networkMaintenance)
      this.regenGrantsGDC = parseFloat(this.cycleDataForm.gdcPercentagesDistribution.regenGrants)
      this.coreDevelopment = parseFloat(this.cycleDataForm.gdcPercentagesDistribution.coreDevelopment)
      this.interestFreeLoans = parseFloat(this.cycleDataForm.gdcPercentagesDistribution.interestFreeLoans)
      this.numPeopleAccounts = parseFloat(this.cycleDataForm.numPeopleAccounts)
      this.peopleGrowth = parseFloat(this.cycleDataForm.peopleGrowth).toFixed(4) // 4
      this.gdpPerPerson = parseFloat(this.cycleDataForm.gdpPerPerson)
      this.numOrganizationAccounts = parseFloat(this.cycleDataForm.numOrganizationAccounts)
      this.organizationsGrowth = parseFloat(this.cycleDataForm.organizationsGrowth).toFixed(4) // 4
      this.gdpPerOrganisation = parseFloat(this.cycleDataForm.gdpPerOrganisation)
      this.numBdcs = parseFloat(this.cycleDataForm.numBdcs)
      this.bdcsGrowth = parseFloat(this.cycleDataForm.bdcsGrowth).toFixed(4) // 4
      this.contracts = parseFloat(this.cycleDataForm.newContractsDuringCycle)
      this.outstandingContracts = parseFloat(this.cycleDataForm.outstandingContracts)
      this.closedContracts = parseFloat(this.cycleDataForm.closedContractsDuringCycle)
      this.closedContractsPercentage = parseFloat(this.cycleDataForm.closedContractsPercentage).toFixed(2)
      this.totalGDP = parseFloat(this.cycleDataForm.totalGDP).toFixed(2)
      this.seedsPlantedPerUserFixed = parseFloat(this.cycleDataForm.seedsPlantedPerUserFixed)
      this.seedsPlantedPerUserVariable = parseFloat(this.cycleDataForm.seedsPlantedPerUserVariable)
      this.averageSeedsBurnedPerUser = parseFloat(this.cycleDataForm.averageSeedsBurnedPerUser)
      this.contractsGrowth = parseFloat(this.cycleDataForm.contractsGrowth).toFixed(4) // 4
      this.totals = this.cycleDataForm.totals
      this.unplantedSeedsPerUser = parseFloat(this.cycleDataForm.unplantedSeedsPerUser)
      this.bankSeedsPerCycle = parseFloat(this.cycleDataForm.bankSeedsPerCycle).toFixed(2)
      this.seedsPerContract = parseFloat(this.cycleDataForm.seedsPerContract)
      this.outstandingContractsSeeds = parseFloat(this.cycleDataForm.outstandingContractsSeeds)
      this.contractsSeeds = parseFloat(this.cycleDataForm.newContractsDuringCycleSeeds)
      this.closedContractsSeeds = parseFloat(this.cycleDataForm.closedContractsDuringCycleSeeds)
      this.globalDhoInfo = { ...this.cycleDataForm.globalDhoInfo }
      this.globalDhoInfo.dhos = this.globalDhoInfo.dhos.map((dho, index) => { return { ...dho, name: `DHO ${index + 1}` } })
      console.log('....................................................')
      console.log('MIRA EN CYCLES: seeds per contract:', parseFloat(this.cycleDataForm.seedsPerContract).toFixed(2))
      console.log('....................................................')
      this.changeDataStatesInitTable()
      //   console.log('After Sync Form:', this.getSimulationState)
    },
    cleanFormat (value) {
      console.log('Clean Match', value)
      var match = value.match(/[0-9,.]*/)
      let amount
      if (match !== null) {
        amount = parseFloat(match[0].replace(/,/g, '')) // replace , thousands separator
      }
      return amount
    },
    addDHOS () {
      const dhos = this.globalDhoInfo.dhos.map((dho, index) => {
        return {
          ...dho,
          name: `DHO ${index + 1}`
        }
      })
      this.globalDhoInfo.dhos = [...dhos, { name: `DH0 ${dhos.length + 1}`, votePercentage: 0, distPercentage: 0 }]
    },
    deleteDHO (id) {
      const filteredList = this.globalDhoInfo.dhos.filter((_, index) => index !== id).map((dho, index) => {
        return {
          ...dho,
          name: `DHO ${index + 1}`
        }
      })
      this.globalDhoInfo.dhos = [...filteredList]
    },
    formatValues () {
      if (!this.globalDhoInfo.dhos) return JSON.parse(JSON.stringify(this.globalDhoInfo))
      let globalDhoInfo = {}
      globalDhoInfo.dhos = this.globalDhoInfo.dhos.map(dho => {
        const { votePercentage } = dho
        return { ...dho, votePercentage: votePercentage.value }
      })
      globalDhoInfo.minimumVotePercentage = this.globalDhoInfo.minimumVotePercentage.value

      console.log(globalDhoInfo)

      return JSON.parse(JSON.stringify(globalDhoInfo))
    },
    updateDistribution () {
      const dhoInfo = this.formatValues()
      const { dhos } = calcDhoDistPercentages(dhoInfo)

      if (dhos) {
        this.globalDhoInfo.dhos.forEach((dho, index) => {
          dho.distPercentage = dhos[index].distPercentage
        })
      } else {
        this.globalDhoInfo.dhos.forEach((dho, index) => {
          dho.distPercentage = 0
        })
        /* this.showNotification(`${error} in field: ${field}`, 'error') */
      }
    }
  },
  filters: {
    format (price) {
      console.log('price', price)
      let format = new Intl.NumberFormat('nl-NL').format(price)
      console.log('format', format)
      return format
    }
  }
}

// Vue.filter('currencyDisplay', {
//   // model -> view
//   // formats the value when updating the input element.
//   read: function (val) {
//     return '$' + val.toFixed(2)
//   },
//   // view -> model
//   // formats the value when updating the data.
//   write: function (val, oldVal) {
//     var number = +val.replace(/[^\d.]/g, '')
//     return isNaN(number) ? 0 : number
//   }
// })
</script>

<style lang="sass">
#container-add-cycle .q-item
  min-height: 55px
  border-radius: 3px 3px 0px 0px
#container-add-cycle .modalLoadSimulation
  min-width: 30vw
  width: 40vw
  max-width: 60vw
#container-add-cycle .cycle-form
#container-add-cycle .form-group
  border: 1px solid
  border-color: gray
  padding: 5px
#container-add-cycle .scroll-container
  height: calc(100vh - 245px)
  max-width: 100%
#container-add-cycle .bg-readonly
  background: blue
#container-add-cycle .c_input
  background-color: inherit
  flex: 1
  border: none
#container-add-cycle .c_input:focus
  background-color: inherit
  flex: 1
  border: none !important
#container-add-cycle input:focus, textarea:focus, select:focus
  outline: none
.modal-load-simulation
  height: 90vh
  width: 40vw
.banner
  background-color: $red
@media(min-width: 0px) and (max-width: 1025px)
  #container-add-cycle .scroll-container
    height: calc(100vh - 190px)
    max-width: 100%
</style>
