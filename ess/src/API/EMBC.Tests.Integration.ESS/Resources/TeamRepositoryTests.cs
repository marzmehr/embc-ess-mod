﻿using System;
using System.Linq;
using System.Threading.Tasks;
using EMBC.ESS;
using EMBC.ESS.Resources.Metadata;
using EMBC.ESS.Resources.Team;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using Xunit;
using Xunit.Abstractions;

namespace EMBC.Tests.Integration.ESS.Resources
{
    public class TeamRepositoryTests : WebAppTestBase
    {
        private readonly ITeamRepository teamRepository;
        private string teamId = "98275853-2581-eb11-b825-00505683fbf4";

        public TeamRepositoryTests(ITestOutputHelper output, WebApplicationFactory<Startup> webApplicationFactory) : base(output, webApplicationFactory)
        {
            teamRepository = services.GetRequiredService<ITeamRepository>();
        }

        [Fact(Skip = RequiresDynamics)]
        public async Task CanQueryAllTeams()
        {
            (await teamRepository.QueryTeams(new TeamQuery())).Items.ShouldNotBeEmpty();
        }

        [Fact(Skip = RequiresDynamics)]
        public async Task CanQueryTeamById()
        {
            var team = (await teamRepository.QueryTeams(new TeamQuery { Id = teamId })).Items.ShouldHaveSingleItem();
            team.ShouldNotBeNull();
            team.Id.ShouldBe(teamId);
            team.Name.ShouldNotBeNull();
            team.AssignedCommunities.ShouldNotBeEmpty();
        }

        [Fact(Skip = RequiresDynamics)]
        public async Task CanQueryTeamByAssignedCommunity()
        {
            var originalTeam = (await teamRepository.QueryTeams(new TeamQuery { Id = teamId })).Items.ShouldHaveSingleItem();
            var communityCode = originalTeam.AssignedCommunities.First().Code;
            var team = (await teamRepository.QueryTeams(new TeamQuery { AssignedCommunityCode = communityCode })).Items.ShouldHaveSingleItem();
            team.ShouldNotBeNull();
            team.Name.ShouldNotBeNull();
            team.AssignedCommunities.Where(c => c.Code == communityCode).ShouldHaveSingleItem();
        }

        [Fact(Skip = RequiresDynamics)]
        public async Task CanSaveTeam()
        {
            var metaDataRepository = services.GetRequiredService<IMetadataRepository>();
            var unavailableCommunities = (await teamRepository.QueryTeams(new TeamQuery())).Items.SelectMany(t => t.AssignedCommunities).Select(c => c.Code).ToArray();
            var allCommunities = (await metaDataRepository.GetCommunities()).Select(c => c.Code).ToArray();
            var availableCommunities = allCommunities.Where(c => !unavailableCommunities.Any(uc => uc == c)).ToArray();

            var team = (await teamRepository.QueryTeams(new TeamQuery { Id = teamId })).Items.ShouldHaveSingleItem();
            team.AssignedCommunities = availableCommunities.Take(10).Select(c => new AssignedCommunity { Code = c, DateAssigned = DateTime.UtcNow });

            var updatedTeamId = await teamRepository.SaveTeam(team);

            var updatedTeam = (await teamRepository.QueryTeams(new TeamQuery { Id = teamId })).Items.ShouldHaveSingleItem();
            updatedTeam.AssignedCommunities.Select(c => c.Code).OrderBy(c => c).ToArray().ShouldBe(team.AssignedCommunities.Select(c => c.Code).OrderBy(c => c).ToArray());
        }

        [Fact(Skip = RequiresDynamics)]
        public async Task CanGetTeamMembers()
        {
            var members = await teamRepository.GetMembers(teamId);

            members.ShouldNotBeEmpty();
        }

        [Fact(Skip = RequiresDynamics)]
        public async Task CanAddTeamMember()
        {
            var now = DateTime.UtcNow;
            now = new DateTime(now.Ticks - (now.Ticks % TimeSpan.TicksPerSecond), DateTimeKind.Unspecified);

            var newTeamMember = new TeamMember
            {
                Id = null,
                TeamId = teamId,
                FirstName = "first",
                LastName = "last",
                Email = "email@email.com",
                Phone = "123456",
                AgreementSignDate = now,
                LastSuccessfulLogin = now,
                Label = "Volunteer",
                Role = "Tier1",
                ExternalUserId = "extid",
                UserName = "username",
                IsActive = true,
            };
            var newMemberId = await teamRepository.SaveMember(newTeamMember);

            var members = await teamRepository.GetMembers(teamId);

            var newMember = members.Where(m => m.Id == newMemberId).ShouldHaveSingleItem();
            newMember.Id.ShouldNotBeNull();
            newMember.TeamId.ShouldBe(newTeamMember.TeamId);
            newMember.TeamName.ShouldNotBeNull();
            newMember.FirstName.ShouldBe(newTeamMember.FirstName);
            newMember.LastName.ShouldBe(newTeamMember.LastName);
            newMember.Email.ShouldBe(newTeamMember.Email);
            newMember.Phone.ShouldBe(newTeamMember.Phone);
            newMember.Label.ShouldBe(newTeamMember.Label);
            newMember.Role.ShouldBe(newTeamMember.Role);
            newMember.UserName.ShouldBe(newTeamMember.UserName);
            newMember.ExternalUserId.ShouldBe(newTeamMember.ExternalUserId);
            newMember.IsActive.ShouldBe(newTeamMember.IsActive);
            newMember.LastSuccessfulLogin.ShouldNotBeNull().ShouldBe(newTeamMember.LastSuccessfulLogin.Value);
            newMember.AgreementSignDate.ShouldNotBeNull().Date.ShouldBe(newTeamMember.AgreementSignDate.Value.Date);
        }

        [Fact(Skip = RequiresDynamics)]
        public async Task CanUpdateTeamMember()
        {
            var members = await teamRepository.GetMembers(teamId);

            var now = DateTime.UtcNow;

            var memberToUpdate = members.First();
            memberToUpdate.AgreementSignDate.ShouldNotBe(now);

            memberToUpdate.AgreementSignDate = now;

            var updatedMemberId = await teamRepository.SaveMember(memberToUpdate);

            var updatedMembers = await teamRepository.GetMembers(teamId);

            var updatedMember = updatedMembers.Single(m => m.Id == updatedMemberId);
            updatedMember.AgreementSignDate.ShouldNotBeNull().ShouldBe(now.Date);
        }

        [Fact(Skip = RequiresDynamics)]
        public async Task CanDeleteTeamMember()
        {
            var memberId = await teamRepository.SaveMember(new TeamMember { FirstName = "to delete", LastName = "to delete", TeamId = teamId, IsActive = true });

            await teamRepository.DeleteMember(teamId, memberId);

            var newMembers = await teamRepository.GetMembers(teamId, onlyActive: false);

            newMembers.SingleOrDefault(m => m.Id == memberId).ShouldBeNull();
        }
    }
}
