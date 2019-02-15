using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Channels;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRSite.Hubs
{
    public class StreamHub : Hub
    {

        public ChannelReader<string> DelayCounter(string user, string message)
        {
            var channel = Channel.CreateUnbounded<string>();

            _ = WriteItems(channel.Writer, message);

            return channel.Reader;
        }

        private async Task WriteItems(ChannelWriter<string> writer, string message)
        {

           await writer.WriteAsync(message);

            writer.TryComplete();
        }
    }
}
